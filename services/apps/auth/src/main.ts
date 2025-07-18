/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // The first argument should be the Module itself.
  // The second argument is the options object.
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0', // Listen on all available network interfaces within the container
        port: 4002, // You can use the env var here too if you have ConfigService setup
      },
    },
  );

  await app.listen();
  console.log('Auth microservice is listening'); // Added for debugging
}
bootstrap();
