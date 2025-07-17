/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  nom: string;

  prenom: string;

  @Type(() => Number)
  @IsNumber()
  tel: number;

  @IsString()
  password: string;

  @IsString()
  role: 'admin' | 'validator' | 'transporter' | 'sender';

  primaryAddress: string;

  status: string;

  @Type(() => Date)
  date_inscription: Date;
}
