// apps/api-gateway/src/rpc-exception.filter.ts

import {
  Catch,
  ArgumentsHost,
  RpcExceptionFilter as BaseRpcExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter
  implements BaseRpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception.getError();

    // Handle structured error object
    if (
      typeof error === 'object' &&
      'statusCode' in error &&
      'message' in error
    ) {
      const { statusCode, message } = error;
      return response.status(statusCode).json({
        statusCode,
        message,
        error: (error as any)?.error ?? 'Error',
      });
    }

    // Fallback
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error?.toString?.() ?? 'Internal server error',
      error: 'Internal Server Error',
    });
  }
}
