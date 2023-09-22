import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TransformPrivateUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((usersData: User | User[]) => {
        if (Array.isArray(usersData)) {
          for (const user of usersData) {
            delete user.password;
          }
        } else {
          delete usersData.password;
        }

        return usersData;
      }),
    );
  }
}
