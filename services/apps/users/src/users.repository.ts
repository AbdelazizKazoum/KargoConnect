import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { AbstractRepository } from '@app/shared/database.index';

@Injectable()
export class UsersRepository extends AbstractRepository<Users> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
  }
}
