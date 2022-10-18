import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, finalize } from 'rxjs/operators';
import { CommonService } from './common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private commonService: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  private totalRequests = 0;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;

    this.spinner.show();
    const reqWithAuth = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return next.handle(reqWithAuth).pipe(
      // retry function for retry api automatically
      // retry(1),
      finalize(() => {
        // all reuest hit then spiiner hide..
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.spinner.hide();
        }
      }),

      // API error handling...
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          if (error.error.message == 'jwt expired') {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          } else {
            this.commonService.errorToaster(error.error.message);
          }
        }
        return throwError(error);
      })
    );
  }
}
