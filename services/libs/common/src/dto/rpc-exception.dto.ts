// shared/dtos/rpc-exception.dto.ts
export class RpcExceptionDto {
  statusCode: number;
  message: string | string[];
  error: string;
}
