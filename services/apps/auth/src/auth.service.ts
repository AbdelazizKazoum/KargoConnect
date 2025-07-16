import { User } from '@app/common';
import { jwtConstants } from '@app/common/constants/jwt.constants';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersCLient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await firstValueFrom(
      this.usersCLient.send({ cmd: 'get_user_by_email' }, email),
    );
    if (user && user.password === pass) return user;
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      access_refresh_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.jwtRefreshExpirationTime,
      }),
    };
  }
}
