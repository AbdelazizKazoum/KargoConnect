/* eslint-disable prettier/prettier */
import { LoginDto, RegisterDto } from '@app/common';
import { JwtAuthGuard } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
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
