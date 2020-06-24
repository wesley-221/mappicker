import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { OsuService } from "../services/osu.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthenticationService, private osuService: OsuService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Only send the token to the wyBin api
		if (req.url.includes(environment.apiUrl)) {
			const token: String = this.authService.authToken;

			if (token) {
				req = req.clone({ setHeaders: { Authorization: `${token}` }, withCredentials: true });
			}
		}

		// Only send the token to the osu! api
		if (req.url.includes(environment.osu.api_url)) {
			const token: String = this.osuService.oauthToken;

			if (token) {
				req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }, withCredentials: true });
			}
		}

		return next.handle(req).pipe(catchError((error: HttpErrorResponse): Observable<any> => {
			// Show the generic known errors, have to figure out the other errors over time
			if (error.status === 401 || error.status === 403) {
				// this.toastService.addToast(error.error.message, ToastType.Error);

				return of(error.error.message);
			}

			return throwError(error);
		}));
	}
}
