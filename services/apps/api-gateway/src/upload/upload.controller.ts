import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '@app/shared/minio/minio.service'; // path to shared lib
import { File as MulterFile } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private minioService: MinioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: MulterFile) {
    return this.minioService.uploadFile(file);
  }
}
