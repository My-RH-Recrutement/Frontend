import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes("auth") && request.url !== "http://localhost:8081/api/v1/joboffers") {      
      let newRequest = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${this._authService.accessToken}`)
      });
      return next.handle(newRequest).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this._router.navigate(["/not-authorized"]);
          }
          return throwError(() => new Error(error));
        })
      );
    }else return next.handle(request);
  }
}
