/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AuthModule>({
    module: AuthModule,
    options: {
      transport: 'TCP',
      options: {
        host: '0.0.0.0', // ← THIS IS IMPORTANT
        port: parseInt(process.env.PORT, 10) || 4002,
      },
    },
  });
  await app.listen();
}
bootstrap();
