import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response as ExpressResponse } from 'express';
import { map, Observable } from 'rxjs';
import { Response } from '../../models/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const response = httpContext.getResponse<ExpressResponse>();
    const code = response.statusCode;

    return next.handle().pipe(
      map((value) => {
        return {
          code,
          data: value,
        };
      }),
    );
  }
}
