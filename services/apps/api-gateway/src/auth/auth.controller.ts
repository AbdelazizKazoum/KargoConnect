/* eslint-disable prettier/prettier */
import { LoginDto, RegisterDto } from '@app/common';
import { JwtAuthGuard, MinioService } from '@app/shared';
import {
  Body,
  Controller,
  Get,
  Inject,
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

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
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

    console.log('🚀 ~ AuthController ~ register ~ files:', files);
    console.log('🚀 ~ AuthController ~ register ~ body:', body);

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
    return this.client.send({ cmd: 'login' }, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
