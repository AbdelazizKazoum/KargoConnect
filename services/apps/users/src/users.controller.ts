/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterDto, RpcInternalServerErrorException } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return 'hello woekd';
  }

  @MessagePattern({ cmd: 'create-user' })
  async create(@Body() createUserDto: RegisterDto) {
    console.log(
      '🚀 ~ UsersController ~ create ~ createUserDto:',
      createUserDto,
    );

    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.log('🚀 ~ UsersController ~ create ~ error:', error);

      throw new RpcInternalServerErrorException(error);
    }
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  getUserByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'get_user_by_provider' })
  async getUserByProvider(data: { provider: string; providerId: string }) {
    return await this.usersService.findByProvider(
      data.provider,
      data.providerId,
    );
  }

  @MessagePattern({ cmd: 'getUsers' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'getPublicProfile' })
  async getUserPublicProfile(id: number) {
    return await this.usersService.getUserPublicProfile(id);
  }

  @MessagePattern({ cmd: 'getPrivateProfile' })
  async getUserPrivateProfile(id: number) {
    return await this.usersService.getUserPrivateProfile(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @MessagePattern({ cmd: 'update_user' })
  async update(updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
