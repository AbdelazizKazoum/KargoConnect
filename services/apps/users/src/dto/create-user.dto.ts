export class CreateUserDto {
  email: string;

  username: string;

  identity: string;

  nom: string;

  prenom: string;

  tel: number;

  password: string;

  role: 'admin' | 'validator' | 'transporter' | 'sender';

  primaryAddress: string;

  status: string;

  date_inscription: Date;
}
