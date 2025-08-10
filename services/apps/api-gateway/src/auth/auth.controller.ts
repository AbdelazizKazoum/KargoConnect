/* eslint-disable prettier/prettier */
import { LoginDto, RegisterDto } from '@app/common';
import { mapRpcErrorToHttp } from '@app/common/exceptions/map-rpc-error';
import { JwtAuthGuard, MinioService } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  InternalServerErrorException,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
import { File as MulterFile } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private readonly minioService: MinioService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profilePicture')) // "avatar" is the form-data field name
  async register(@Body() body: RegisterDto, @UploadedFile() file?: MulterFile) {
    if (file) {
      const uploaded = await this.minioService.uploadFile(file);
      body.profilePicture = uploaded.url; // attach file URL to the user DTO
    }

    return await firstValueFrom(this.client.send({ cmd: 'register' }, body));
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.client.send({ cmd: 'login' }, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
