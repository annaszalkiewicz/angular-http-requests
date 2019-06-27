import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({ headers: req.headers.append('Auth', 'interceptor')});
    return next.handle(modifiedReq).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived');
        }
      })
    );
  }
}
