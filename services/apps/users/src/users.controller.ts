/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterDto } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return 'hello woekd';
  }

  @MessagePattern({ cmd: 'create-user' })
  async create(@Body() createUserDto: RegisterDto) {
    return await this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  getUserByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
