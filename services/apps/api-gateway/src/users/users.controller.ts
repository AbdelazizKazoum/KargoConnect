/* eslint-disable prettier/prettier */
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}

  @Get()
  async fetchUsers() {
    const users = await firstValueFrom(
      this.client.send({ cmd: 'getUsers' }, ''),
    );

    return users;
  }
}
