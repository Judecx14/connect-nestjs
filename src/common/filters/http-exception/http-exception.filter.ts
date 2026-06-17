import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Response } from '../../models/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private extractProp<T>(response: unknown, prop: string): T | null {
    if (response !== null && typeof response === 'object' && prop in response) {
      return response[prop] as T;
    }

    return null;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();

    const code = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const error = this.extractProp<string>(exceptionResponse, 'error');
    const messages = this.extractProp<string[]>(exceptionResponse, 'message');

    const responseMapped: Response = {
      code,
      error,
      messages,
      data: null,
    };

    response.status(code).json(responseMapped);
  }
}
