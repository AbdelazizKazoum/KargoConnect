// shared/utils/map-rpc-error.ts
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function mapRpcErrorToHttp(err: any): never {
  if (err?.statusCode && err?.message) {
    throw new HttpException(
      {
        statusCode: err.statusCode,
        message: err.message,
        error: err.error || 'Error',
      },
      err.statusCode,
    );
  }

  throw new InternalServerErrorException('Something went wrong');
}
