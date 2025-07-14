import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  username: string;

  identity: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  tel: number;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: 'admin' | 'validator' | 'transporter' | 'sender';

  @IsString()
  primaryAddress: string;

  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_inscription: Date;
}
