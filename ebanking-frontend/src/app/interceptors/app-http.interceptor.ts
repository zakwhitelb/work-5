// src/app/interceptors/app-http.interceptor.ts
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {catchError, Observable, throwError} from "rxjs";

export const appHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  // Ne pas toucher à la requête de login
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  // Cloner et ajouter le header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accesToken}`
    }
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
