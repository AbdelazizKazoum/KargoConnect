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

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

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
  @Type(() => Number)
  @IsNumber()
  tel?: number;

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
  @Type(() => Date)
  date_inscription?: Date;
}
