import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { Users } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Users]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
