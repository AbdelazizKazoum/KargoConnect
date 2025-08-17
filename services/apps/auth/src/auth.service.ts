/* eslint-disable prettier/prettier */
import { RegisterDto, RpcUnauthorizedException, User } from '@app/common';
import { jwtConstants } from '@app/common/constants/jwt.constants';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, last } from 'rxjs';

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
    console.log('🚀 ~ AuthService ~ register ~ user:', user);

    try {
      const data = await firstValueFrom(
        this.usersCLient.send({ cmd: 'create-user' }, user),
      );
      return data;
    } catch (error) {
      throw new RpcException(error); // preserves shape
    }
  }

  async oauthLogin(data: any) {
    try {
      // Check if user already exists
      const existingUser = await firstValueFrom(
        this.usersCLient.send(
          { cmd: 'get_user_by_provider' },
          {
            provider: data.provider,
            providerId: data.providerId,
          },
        ),
      );

      if (existingUser) {
        return existingUser; // User already exists, return it
      }

      // If user does not exist, create a new one
      const newUser = await firstValueFrom(
        this.usersCLient.send(
          { cmd: 'create-user' },
          {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image,
            provider: data.provider,
            providerId: data.providerId,
            isEmailVerified: true, // Assuming OAuth users are verified
            isProfileComplete: false, // For OAuth, we might not have all details
            // password: data.password, // No password for OAuth users
          },
        ),
      );

      if (!newUser) {
        throw new RpcUnauthorizedException('Failed to create user');
      }

      // Return the newly created user
      return newUser;
    } catch (error) {
      console.log('🚀 ~ AuthService ~ oauthLogin ~ error:', error);

      throw new RpcException(error); // preserves shape
    }
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
    };
    return {
      user: {
        id: user.id,
        email: user.email,
        // username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        image: user.image,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
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
