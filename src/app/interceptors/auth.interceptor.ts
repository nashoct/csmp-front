import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LoginService } from '../services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // El login todavía no dispone de token, se deja pasar sin cabecera.
  if (req.url.includes('/auth/signin')) {
    return next(req);
  }

  const loginService = inject(LoginService);

  return from(loginService.getToken()).pipe(
    switchMap((token) => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    })
  );
};
