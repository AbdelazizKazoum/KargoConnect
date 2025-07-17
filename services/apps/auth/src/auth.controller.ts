/* eslint-disable prettier/prettier */
import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@app/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'hello woekd';
  }

  @MessagePattern({ cmd: 'register' })
  async register(data: RegisterDto) {
    const user = await this.authService.register(data);
    return user;
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'verify_token' })
  async verifyToken(token: string) {
    try {
      return this.authService.verifyToken(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
