/* eslint-disable prettier/prettier */
import { RegisterDto, RpcUnauthorizedException, User } from '@app/common';
import { jwtConstants } from '@app/common/constants/jwt.constants';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import * as bcrypt from 'bcrypt'; // <-- Import bcrypt

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

    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) return null;

    return user;
  }

  async register(user: RegisterDto) {
    try {
      const data = await firstValueFrom(
        this.usersCLient.send({ cmd: 'create-user' }, user),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.jwtRefreshExpirationTime,
      }),
    };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: jwtConstants.jwtTokenSecret,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new RpcUnauthorizedException('Invalid token');
    }
  }
}
