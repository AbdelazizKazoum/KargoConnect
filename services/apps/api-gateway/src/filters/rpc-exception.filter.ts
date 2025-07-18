// apps/api-gateway/src/rpc-exception.filter.ts

import {
  Catch,
  RpcExceptionFilter as BaseRpcExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter
  implements BaseRpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'statusCode' in rpcError &&
      'message' in rpcError
    ) {
      const statusCode = rpcError.statusCode as number;
      return response.status(statusCode).json(rpcError);
    }

    // Fallback for unexpected RpcException format
    return throwError(() => new HttpException('Internal server error', 500));
  }
}
