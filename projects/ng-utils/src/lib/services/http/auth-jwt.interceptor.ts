import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthJwtService } from './auth-jwt.service';

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {
  constructor(public authJwtService: AuthJwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authJwtService.token}`,
        Accept: 'application/json;charset=utf-8',
        AcceptCharset: 'UTF-8',
      },
    });

    return next.handle(request);
  }
}
