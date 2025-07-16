/* eslint-disable prettier/prettier */
import { AbstractEntity } from '@app/shared/database/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Users extends AbstractEntity<Users> {
  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  username: string;

  @Column({ nullable: true })
  identity: string;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ nullable: true })
  tel: number;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'validator' | 'transporter' | 'sender';

  @Column({ nullable: true })
  primaryAddress: string;

  @Column({ default: 'Active' })
  status: string;

  @Column({ nullable: true })
  date_inscription: Date;
}
