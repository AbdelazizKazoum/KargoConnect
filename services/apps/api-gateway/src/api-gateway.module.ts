import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { LoggerModule } from '@app/common/logger';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthCoreModule } from '@app/shared';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggerModule,
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
    AuthModule, // Register your microservice clients here
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, AuthCoreModule],
})
export class ApiGatewayModule {}
