import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.serverUrl)) {
      return next.handle(request.clone({
        headers: request.headers.set('X-Auth-Token', '4f0bb994c29240e682320f6ea32a6405')
      }));
    }
    return next.handle(request);
  }
}
