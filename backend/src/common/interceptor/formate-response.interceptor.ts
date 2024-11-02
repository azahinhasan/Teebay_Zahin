import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const {messages,statusCode,...otherData} = data
        return {
          statusCode: statusCode||'200',
          success: true,
          message: messages||'Request processed successfully',
          ...otherData,
        };
      }),
      catchError((error) => {
        const statusCode = error.extensions?.code || '400';
        const formattedError = {
          success: false,
          message: error.message || 'Internal Server Error',
          statusCode,
        };
        return of(formattedError);
      }),
    );
  }
}
