import { RpcException } from '@nestjs/microservices';

// A base class to structure all our RPC errors
export class RpcCustomException extends RpcException {
  // The payload will now be { message, statusCode, source }
  constructor(
    message: string | string[],

    readonly statusCode: number,
    readonly source?: string,
    // readonly error?: any,
  ) {
    super({ message, statusCode, source });
  }
}

// Now, define specific exceptions for common HTTP errors
export class RpcNotFoundException extends RpcCustomException {
  constructor(message = 'Not Found', source?: string) {
    super(message, 404, source);
  }
}

export class RpcBadRequestException extends RpcCustomException {
  constructor(message = 'Bad Request', source?: string) {
    super(message, 400, source);
  }
}

export class RpcUnauthorizedException extends RpcCustomException {
  constructor(message = 'Unauthorized', source?: string) {
    super(message, 401, source);
  }
}

export class RpcConflictException extends RpcCustomException {
  constructor(message = 'Conflict', source?: string) {
    super(message, 409, source);
  }
}

// 💥 New: Internal Server Error
export class RpcInternalServerErrorException extends RpcCustomException {
  constructor(message = 'Internal Server Error', source?: string) {
    super(message, 500, source);
  }
}
