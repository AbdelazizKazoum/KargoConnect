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

      // Mock data for public profile
      reviews: [
        {
          id: 1,
          author: 'Youssef B.',
          rating: 5,
          comment:
            'Amina is a great sender! Package was ready on time and communication was excellent.',
        },
        {
          id: 2,
          author: 'Fatima Z.',
          rating: 5,
          comment: 'Very reliable and friendly. A pleasure to work with.',
        },
      ],
      demands: [
        {
          id: 1,
          packageType: 'Small Box',
          origin: 'Fes',
          destination: 'Meknes',
          date: '2025-07-25',
          status: 'Active',
          offers: 3,
        },
        {
          id: 2,
          packageType: 'Documents',
          origin: 'Rabat',
          destination: 'Kenitra',
          date: '2025-07-28',
          status: 'Active',
          offers: 1,
        },
        {
          id: 3,
          packageType: 'Laptop',
          origin: 'Casablanca',
          destination: 'Rabat',
          date: '2025-07-18',
          status: 'Completed',
          offers: 1,
        },
      ],
      bookings: [
        {
          id: 1,
          transporter: 'Youssef B.',
          packageType: 'Laptop',
          origin: 'Casablanca',
          destination: 'Rabat',
          date: '2025-07-18',
          status: 'Completed',
          price: 80,
        },
        {
          id: 2,
          transporter: 'Mehdi A.',
          packageType: 'Gift Basket',
          origin: 'Marrakech',
          destination: 'Agadir',
          date: '2025-08-02',
          status: 'Upcoming',
          price: 120,
        },
      ],

      // Mock data for transporter profile
      trips: [
        {
          id: 1,
          origin: 'Casablanca',
          destination: 'Marrakech',
          date: '2025-07-15',
          status: 'Completed',
          earnings: 150,
        },
        {
          id: 2,
          origin: 'Rabat',
          destination: 'Tangier',
          date: '2025-07-20',
          status: 'Upcoming',
          earnings: 120,
        },
        {
          id: 3,
          origin: 'Fes',
          destination: 'Ifrane',
          date: '2025-08-01',
          status: 'Upcoming',
          earnings: 90,
        },
        {
          id: 4,
          origin: 'Agadir',
          destination: 'Marrakech',
          date: '2025-06-30',
          status: 'Completed',
          earnings: 200,
        },
        {
          id: 5,
          origin: 'Casablanca',
          destination: 'Fes',
          date: '2025-08-05',
          status: 'Upcoming',
          earnings: 130,
        },
      ],
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({ id: +id }, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.findOneAndDelete({ id: +id });
  }
}
