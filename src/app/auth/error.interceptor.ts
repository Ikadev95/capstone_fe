import { HttpInterceptorFn } from '@angular/common/http';
import { AuthsrvService } from './authsrv.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthsrvService);

  // return next(req).pipe(
  //   catchError((err) => {
  //     if (err.status === 401) {
  //       console.log("Token scaduto o non valido");
  //       authService.logout();
  //     }
  //     return throwError(() => err);
  //   })
  // );

  return next(req);
};
