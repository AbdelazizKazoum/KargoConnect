import { jwtConstants } from '@app/common/constants/jwt.constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratigies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.jwtTokenSecret,
      signOptions: jwtConstants.jwtExpirationTime
        ? { expiresIn: jwtConstants.jwtExpirationTime }
        : undefined,
    }),
  ],
  exports: [PassportModule, JwtModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AuthCoreModule {}
