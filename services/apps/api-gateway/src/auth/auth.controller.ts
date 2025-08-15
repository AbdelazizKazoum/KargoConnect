/* eslint-disable prettier/prettier */
import { LoginDto, RegisterDto } from '@app/common';
import { JwtAuthGuard, MinioService } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
import { File as MulterFile } from 'multer';
import { In } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    @Inject('USERS_SERVICE') private userClient: ClientProxy,

    private readonly minioService: MinioService,
  ) {}

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'vehicleImages', maxCount: 5 },
    ]),
  )
  async register(
    @Body('data') data: string,
    @UploadedFiles()
    files: {
      profilePicture?: MulterFile[];
      vehicleImages?: MulterFile[];
    },
  ) {
    const body = JSON.parse(data) as RegisterDto;

    // Upload profile picture if present
    if (files.profilePicture?.[0]) {
      const uploadedProfile = await this.minioService.uploadFile(
        files.profilePicture[0],
        'profile-pictures',
      );
      body.image = uploadedProfile.key;
    }

    // Upload vehicle images if present
    if (files.vehicleImages?.length) {
      const uploadedVehicles = await this.minioService.uploadMultipleFiles(
        files.vehicleImages,
        'vehicles',
      );
      body.vehicle = {
        ...body.vehicle,
        images: uploadedVehicles.map((f) => f.key),
      };
    }

    return await firstValueFrom(this.client.send({ cmd: 'register' }, body));
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.client.send({ cmd: 'login' }, body);
  }

  @Post('oauth-login')
  async oauthLogin(@Body() body: any) {
    return await this.client.send({ cmd: 'oauth-login' }, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const profile = await firstValueFrom(
      this.userClient.send({ cmd: 'getPrivateProfile' }, req.user.id),
    );
    console.log('🚀 ~ AuthController ~ getProfile ~ profile:', profile);

    if (!profile) {
      return null;
    }

    try {
      // Replace profile.image with signed URL
      profile.image = profile.image
        ? await this.minioService.getSignedUrl(profile.image)
        : null;

      // Replace profile.coverUrl with signed URL
      profile.coverUrl = profile.coverUrl
        ? await this.minioService.getSignedUrl(profile.coverUrl)
        : null;

      // Replace each vehicle's images with signed URLs
      if (profile.vehicles?.length) {
        profile.vehicles = await Promise.all(
          profile.vehicles.map(async (vehicle) => {
            const signedImages = await this.minioService.getSignedUrls(
              vehicle.images || [],
            );
            return {
              ...vehicle,
              images: signedImages,
            };
          }),
        );
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve media URLs');
    }

    return profile;
  }
}
