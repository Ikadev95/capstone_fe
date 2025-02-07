import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthsrvService } from './authsrv.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthsrvService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.log('Token scaduto o non valido, effettuando logout...');
        authService.logout();
        router.navigate(['/auth']);
      }
      return throwError(() => error);
    })
  );
};
