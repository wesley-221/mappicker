import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private cookieService: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token: string = this.cookieService.get(this.authService.cookieName);

        if(token) {
            req = req.clone({ setHeaders: { Authorization: `${token}` }, withCredentials: true });
        }

        return next.handle(req).pipe(catchError((error: HttpErrorResponse): Observable<any> => {
            // Show the generic known errors, have to figure out the other errors over time
            if(error.status === 401 || error.status === 403) {
                // this.toastService.addToast(error.error.message, ToastType.Error);

                return of(error.error.message);
            }

            return throwError(error);
        }));
    }
}
