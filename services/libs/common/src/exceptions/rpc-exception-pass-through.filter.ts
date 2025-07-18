// apps/auth-service/src/rpc-exception-pass-through.filter.ts

import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionPassThroughFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    // Simply re-throw the exception to propagate it to the caller
    return throwError(() => exception);
  }
}
