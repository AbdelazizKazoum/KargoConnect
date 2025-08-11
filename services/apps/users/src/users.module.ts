/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { LoggerModule } from '@app/common/logger/logger.module';
import * as Joi from 'joi';
import { ConfigModule } from '@app/shared/config/config.module';
import { DatabaseModule } from '@app/shared/database.index';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './vehicle.repository';
import { MinioModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot(
      Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        // DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('1h'),
      }),
    ),

    DatabaseModule,
    DatabaseModule.forFeature([Users, Vehicle]),
    LoggerModule,

    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.TCP, // Transport.TCP
    //     options: {
    //       host: process.env.AUTH_SERVICE_HOST, // no fallback to 'localhost'
    //       port: parseInt(process.env.AUTH_SERVICE_PORT, 10),
    //     },
    //   },
    // ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, VehicleRepository],
})
export class UsersModule {}
