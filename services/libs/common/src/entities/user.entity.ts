import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../shared/src/database/abstract.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column()
  password?: string; // Password is made optional as we don't always want to return it

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
