import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(UsersModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT, 10) || 4001,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  await app.listen();
}
bootstrap();
