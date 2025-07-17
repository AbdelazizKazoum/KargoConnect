/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { LoggerModule } from '@app/common/logger';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthCoreModule } from '@app/shared';

@Module({
  imports: [
    LoggerModule,
    AuthCoreModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP, // Transport.TCP
        options: {
          host: process.env.USERS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.USERS_SERVICE_PORT, 4001) || 4001,
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP, // Transport.TCP
        options: {
          host: process.env.AUTH_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.AUTH_SERVICE_PORT, 4002) || 4002,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, AuthController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
