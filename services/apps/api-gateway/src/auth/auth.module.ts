import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthCoreModule } from '@app/shared';

@Module({
  imports: [
    AuthCoreModule,
    // Import necessary modules here, e.g., AuthCoreModule, ConfigModule, etc.
  ],
  controllers: [AuthController],
})
export class AuthModule {}
