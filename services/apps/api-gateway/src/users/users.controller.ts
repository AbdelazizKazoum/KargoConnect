import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}

  @Get(':id/public-profile')
  async getUserPublicProfile(@Param('id', ParseIntPipe) id: number) {
    const profile = await firstValueFrom(
      this.client.send({ cmd: 'getPublicProfile' }, id),
    );

    return profile;
  }

  @Get()
  async fetchUsers() {
    const users = await firstValueFrom(
      this.client.send({ cmd: 'getUsers' }, ''),
    );

    return users;
  }
}
