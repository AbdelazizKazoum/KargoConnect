import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception.getError?.() ?? exception;

    if (typeof error === 'object' && 'statusCode' in error) {
      const { statusCode, message } = error as any;
      return response.status(statusCode).json({
        statusCode,
        message,
        error: HttpStatus[statusCode] ?? 'Error',
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: error?.toString?.() ?? 'Internal server error',
      error: 'Internal Server Error',
    });
  }
}
