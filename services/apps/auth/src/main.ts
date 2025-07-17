/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AuthModule>({
    module: AuthModule,
    options: {
      transport: 'TCP',
      options: {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT, 4002) || 4002,
      },
    },
  });
  await app.listen();
}
bootstrap();
