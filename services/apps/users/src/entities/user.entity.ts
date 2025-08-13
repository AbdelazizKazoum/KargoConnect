/* eslint-disable prettier/prettier */
import { AbstractEntity } from '@app/shared/database/abstract.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Users extends AbstractEntity<Users> {
  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  identity_number?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'validator', 'transporter', 'sender'],
  })
  role: 'admin' | 'validator' | 'transporter' | 'sender';

  @Column({ default: false })
  verified?: boolean;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @Column({ type: 'float', nullable: true })
  rating?: number;

  // PublicProfile extras (demands, bookings) are not stored here, but can be joined/related

  // PrivateProfile fields
  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: false })
  isEmailVerified?: boolean;

  @Column({ default: false })
  isPhoneVerified?: boolean;

  @Column({ default: false })
  isProfileComplete?: boolean;

  @Column({ default: false })
  isTwoFactorEnabled?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user, { nullable: true })
  vehicles?: Vehicle[];

  @Column({ nullable: true })
  provider?: string; // e.g. 'local', 'google', 'facebook'

  @Column({ nullable: true })
  providerId?: string; // e.g. Google/Facebook user ID
}
