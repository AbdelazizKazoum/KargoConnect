/* eslint-disable prettier/prettier */
import { AbstractEntity } from '@app/shared/database/abstract.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Vehicle extends AbstractEntity<Vehicle> {
  @Column({ type: 'varchar', length: 100 })
  type: string; // e.g., van, truck, etc.

  @Column({ type: 'float' })
  capacity_kg: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  plate_number?: string;

  @Column('simple-array', { nullable: true })
  images?: string[]; // array of image URLs

  @Column({ type: 'text', nullable: true })
  description?: string; // optional: details about the vehicle condition, features, etc.

  // Relation to User (Transporter)
  @ManyToOne(() => Users, (user) => user.vehicles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  user_id: number;
}
