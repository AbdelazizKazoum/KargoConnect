import { Controller, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from '@app/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }
}
