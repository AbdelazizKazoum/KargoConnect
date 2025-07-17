/* eslint-disable prettier/prettier */
import { LoginDto } from '@app/common';
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

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

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
