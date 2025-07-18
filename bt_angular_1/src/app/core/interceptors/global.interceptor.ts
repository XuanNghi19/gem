import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders()
      .set('x-api-key', 'reqres-free-v1')
      .set('Content-Type', 'application/json');

    const reqClone = req.clone({headers});
    if(token && !req.url.includes('/login')) {
      headers.set('Authorization', token);
      return next.handle(reqClone);
    }

    return next.handle(reqClone);
  }
}
