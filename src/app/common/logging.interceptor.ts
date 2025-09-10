import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log(`⬅️ ${req.method} ${req.url}`, event.status);
      }
    })
  );
};
