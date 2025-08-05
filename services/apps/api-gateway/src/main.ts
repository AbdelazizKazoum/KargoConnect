import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // ✅ Enable CORS with default or custom options
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*', // Allow all or comma-separated origins from env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  // ✅ Apply the filter globally
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen(process.env.port ?? 4000);
}
bootstrap();
