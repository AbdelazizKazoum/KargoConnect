import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { File as MulterFile } from 'multer';

@Injectable()
export class MinioService {
  private s3: S3Client;
  private bucket: string;
  private endpoint: string;

  constructor(private configService: ConfigService) {
    this.endpoint = this.configService.get<string>('MINIO_ENDPOINT');
    this.s3 = new S3Client({
      endpoint: `http://${this.endpoint}:${this.configService.get<string>('MINIO_PORT')}`,
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
    const ext = extname(originalName);
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

      // Return only the key (no MinIO internal URL)
      return { key: fileKey };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error uploading file to MinIO');
    }
  }

  async uploadMultipleFiles(files: MulterFile[], category: string) {
    return Promise.all(files.map((file) => this.uploadFile(file, category)));
  }

  // Generate a temporary signed URL (expiresIn is in seconds)
  async getSignedUrl(fileKey: string, expiresIn = 300): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });
    return await getSignedUrl(this.s3, command, { expiresIn });
  }
}
