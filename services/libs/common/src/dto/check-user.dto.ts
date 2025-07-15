import { IsEmail, IsString } from 'class-validator';

export class CheckUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
