import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ id: +id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({ id: +id }, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.findOneAndDelete({ id: +id });
  }
}
