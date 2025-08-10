/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { IVehicle } from '../interfaces/vehicle.interface';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsOptional()
  // @IsString()
  // username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['admin', 'validator', 'transporter', 'sender'])
  @IsNotEmpty()
  role: 'admin' | 'validator' | 'transporter' | 'sender';

  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  identity_number?: string;

  @IsNotEmpty()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @Type(() => Date)
  date_inscription?: Date;

  @IsOptional()
  image: string;

  @IsOptional()
  vehicle: IVehicle;
}
