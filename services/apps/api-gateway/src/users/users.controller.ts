import { MinioService } from '@app/shared';
import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private client: ClientProxy,
    private readonly minioService: MinioService,
  ) {}

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

    // Call the method to generate signed URLs
    const usersWithSignedUrls = await this.enrichUsersWithSignedUrls(users);

    return usersWithSignedUrls;
  }

  async enrichUsersWithSignedUrls(users: any[]) {
    // Map users and enrich image URLs
    return Promise.all(
      users.map(async (user) => {
        // Signed URL for user.image
        const imageUrl = user.image
          ? await this.minioService.getSignedUrl(user.image)
          : null;

        // Signed URLs for each vehicle image
        const vehicles = await Promise.all(
          (user.vehicles || []).map(async (vehicle) => {
            const signedImages = await Promise.all(
              (vehicle.images || []).map((key) =>
                this.minioService.getSignedUrl(key),
              ),
            );

            return {
              ...vehicle,
              images: signedImages,
            };
          }),
        );

        return {
          ...user,
          image: imageUrl,
          vehicles,
        };
      }),
    );
  }
}
