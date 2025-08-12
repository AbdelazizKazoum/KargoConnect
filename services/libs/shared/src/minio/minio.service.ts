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
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private s3: S3Client;
  private bucket: string;

  // Use these for internal and public access
  private internalEndpoint: string;
  private publicUrl: string;

  // Separate S3 clients for internal and public access
  private internalS3: S3Client;
  private publicS3: S3Client;

  constructor(private configService: ConfigService) {
    this.internalEndpoint = this.configService.get<string>('MINIO_ENDPOINT');
    this.publicUrl = this.configService.get<string>('MINIO_PUBLIC_URL');

    this.internalS3 = new S3Client({
      endpoint: `http://${this.internalEndpoint}:${this.configService.get('MINIO_PORT')}`,
      region: this.configService.get<string>('MINIO_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true,
    });

    this.publicS3 = new S3Client({
      endpoint: this.publicUrl, // e.g. http://localhost:9000
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
      await this.internalS3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return { key: fileKey };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error uploading file to MinIO');
    }
  }

  async uploadMultipleFiles(files: MulterFile[], category: string) {
    return Promise.all(files.map((file) => this.uploadFile(file, category)));
  }

  async getSignedUrl(fileKey: string, expiresIn = 300): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    return await getSignedUrl(this.publicS3, command, { expiresIn });
  }

  async getSignedUrls(
    fileKeys: string[],
    expiresIn = 3,
  ): Promise<(string | null)[]> {
    if (!fileKeys || fileKeys.length === 0) {
      return [];
    }

    // Use Promise.all to get all signed URLs in parallel
    return Promise.all(
      fileKeys.map(async (key) => {
        if (!key) return null; // handle empty keys gracefully
        try {
          return await this.getSignedUrl(key, expiresIn);
        } catch (err) {
          console.error(`Failed to get signed URL for ${key}`, err);
          return null; // or throw if you want to fail fast
        }
      }),
    );
  }

  /** Stream file directly from MinIO (for backend proxy) */
  async getFileStream(fileKey: string): Promise<Readable> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });
      const { Body } = await this.s3.send(command);

      if (Body instanceof Readable) {
        return Body;
      }

      throw new InternalServerErrorException('File stream is not readable');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching file from MinIO');
    }
  }
}
