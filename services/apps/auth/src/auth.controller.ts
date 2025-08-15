/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  LoginDto,
  RegisterDto,
  RpcInternalServerErrorException,
  RpcUnauthorizedException,
} from '@app/common';

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

  @MessagePattern({ cmd: 'oauth-login' })
  async oauthLogin(data: any) {
    console.log('🚀 ~ AuthController ~ oauthLogin ~ data:', data);

    const user = await this.authService.oauthLogin(data);
    if (!user) throw new RpcUnauthorizedException();
    return await this.authService.login(user);
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) throw new RpcUnauthorizedException();
    return await this.authService.login(user);
  }

  @MessagePattern({ cmd: 'verify_token' })
  async verifyToken(token: string) {
    try {
      return await this.authService.verifyToken(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new RpcUnauthorizedException();
    }
  }
}
