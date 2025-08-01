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

  async findAll() {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      console.log(error.message);
      throw new RpcInternalServerErrorException('Failed to fetch users ');
    }
  }

  async getUserPublicProfile(id: number) {
    // Use the abstract repo's findOneOrDefault to get the user by id
    const user = await this.usersRepository.findOneOrDefault({ id });
    if (!user) return null;

    // Return only public fields
    return {
      id: user.id,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      role: user.role,
      verified: user.verified,
      rating: user.rating,
      image: user.image,
      coverUrl: user.coverUrl,
      bio: user.bio,
      phone: user.phone,
      country: user.country,
      city: user.city,
      address: user.address,
      // Add any other public fields you want to expose
      // e.g., demands, bookings, etc. can be fetched separately if needed
      // Optionally add more public fields if needed
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({ id: +id }, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.findOneAndDelete({ id: +id });
  }
}
