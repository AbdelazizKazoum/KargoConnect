import { MinioService } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { File as MulterFile } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Put(':id/cover-picture')
  @UseInterceptors(FileInterceptor('cover'))
  async setCoverPicture(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: MulterFile,
  ) {
    console.log('🚀 ~ UsersController ~ setCoverPicture ~ file:', file);

    // Upload profile picture if present
    if (file) {
      const uploadedProfile = await this.minioService.uploadFile(
        file,
        'cover-pictures',
      );
      const body = { coverUrl: uploadedProfile.key, id };

      // Call the microservice to update the user's cover picture
      const user = await firstValueFrom(
        this.client.send({ cmd: 'update_user' }, body),
      );

      // Return the updated user profile
      return user;
    }

    return null;
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
    return Promise.all(
      users.map(async (user) => {
        const imageUrl = user.image
          ? await this.minioService.getSignedUrl(user.image)
          : null;

        // Use the utility for vehicle images
        const vehicles = await Promise.all(
          (user.vehicles || []).map(async (vehicle) => {
            const signedImages = await this.minioService.getSignedUrls(
              vehicle.images || [],
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
