/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { LoggerModule } from '@app/common/logger';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthCoreModule, MinioModule } from '@app/shared';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    LoggerModule,
    AuthCoreModule,
    MinioModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICE_HOST,
          port: parseInt(process.env.USERS_SERVICE_PORT, 10),
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST,
          port: parseInt(process.env.AUTH_SERVICE_PORT, 10),
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, AuthController, UsersController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
