import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
