/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthCoreModule } from '@app/shared';

@Module({
  imports: [
    AuthCoreModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP, // Transport.TCP
        options: {
          host: process.env.USERS_SERVICE_HOST, // no fallback to 'localhost'
          port: parseInt(process.env.USERS_SERVICE_PORT, 10),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
