/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

import { DataSource } from 'typeorm'; // import this at the top

import * as bcrypt from 'bcrypt';
import {
  RpcConflictException,
  RpcInternalServerErrorException,
} from '@app/common';
import { VehicleRepository } from './vehicle.repository';
import { Users } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private vehicleRepository: VehicleRepository,
    private readonly dataSource: DataSource, // inject DataSource
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new RpcConflictException('errors.user_already_exists');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (createUserDto.password) {
        // Hash the password before saving

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hashedPassword;
      }

      const vehicleData = createUserDto.vehicle;
      delete createUserDto.vehicle;

      // Use EntityManager directly
      const userRepository = queryRunner.manager.getRepository(Users);
      const vehicleRepository = queryRunner.manager.getRepository(Vehicle);

      const user = userRepository.create(createUserDto);
      await userRepository.save(user);

      if (user.role === 'transporter' && vehicleData) {
        const vehicle = vehicleRepository.create({
          ...vehicleData,
          user,
          user_id: user.id,
        });
        await vehicleRepository.save(vehicle);
      }

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Transaction failed:', error);
      throw new RpcInternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async findByProvider(provider: string, providerId: string) {
    return await this.usersRepository.findOne({
      provider,
      providerId,
    });
  }

  async findAll() {
    try {
      return await this.usersRepository.findAll({
        relations: ['vehicles'],
      });
    } catch (error) {
      console.error(error.message);
      throw new RpcInternalServerErrorException('Failed to fetch users');
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

  async getUserPrivateProfile(id: number) {
    // Use the abstract repo's findOneOrDefault to get the user by id
    const user = await this.usersRepository.findOneOrDefault(
      { id },
      { relations: ['vehicles'] },
    );
    console.log('🚀 ~ UsersService ~ getUserPrivateProfile ~ user:', user);
    if (!user) return null;

    // Return only public fields
    return {
      id: user.id,
      // username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      role: user.role,
      email: user.email,

      rating: user.rating,
      image: user.image,
      coverUrl: user.coverUrl,
      bio: user.bio,
      phone: user.phone,
      country: user.country,
      city: user.city,
      address: user.address,

      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      isProfileComplete: user.isProfileComplete,
      isTwoFactorEnabled: user.isTwoFactorEnabled,

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,

      vehicles: user.vehicles,

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.usersRepository.findOneAndUpdate({ id }, updateUserDto);
    } catch (error) {
      throw new RpcInternalServerErrorException(
        'Failed to update user: ' + error.message,
      );
    }
  }

  remove(id: number) {
    return this.usersRepository.findOneAndDelete({ id: +id });
  }
}
