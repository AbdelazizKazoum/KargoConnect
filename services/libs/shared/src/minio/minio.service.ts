// libs/shared/src/minio/minio.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { File as MulterFile } from 'multer';

@Injectable()
export class MinioService {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      endpoint: `http://${this.configService.get<string>('MINIO_ENDPOINT')}:${this.configService.get<string>('MINIO_PORT')}`,
      region: this.configService.get<string>('MINIO_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true,
    });

    this.bucket = this.configService.get<string>('MINIO_BUCKET');
  }

  private generateFileKey(category: string, originalName: string) {
    const ext = extname(originalName); // keep original extension
    return `${category}/${randomUUID()}${ext}`;
  }

  async uploadFile(file: MulterFile, category: string) {
    const fileKey = this.generateFileKey(category, file.originalname);

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return {
        key: fileKey,
        url: `http://${this.configService.get<string>('MINIO_ENDPOINT')}:${this.configService.get<string>('MINIO_PORT')}/${this.bucket}/${fileKey}`,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error uploading file to MinIO');
    }
  }

  async uploadMultipleFiles(files: MulterFile[], category: string) {
    return Promise.all(files.map((file) => this.uploadFile(file, category)));
  }
}
