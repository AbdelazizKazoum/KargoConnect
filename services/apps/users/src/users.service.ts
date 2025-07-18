/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

import * as bcrypt from 'bcrypt';
import {
  RpcConflictException,
  RpcInternalServerErrorException,
} from '@app/common';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new RpcConflictException('User with this email already exists');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hashedPassword;

      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      throw new RpcInternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
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
