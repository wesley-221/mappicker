import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserRequest } from '../models/user-request';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecode from "jwt-decode";

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {
	public readonly cookieName: string = "auth";
	private readonly apiUrl: string = environment.apiUrl;
	public user: User;
	public isLoggedIn: boolean;

	constructor(private httpClient: HttpClient, private cookieService: CookieService) {
		const authCookie: any = this.getCookie(this.cookieName);

		if (authCookie !== "") {
			const loggedInUser: User = new User(),
				cookieValue = jwtDecode(authCookie);

			loggedInUser.id = cookieValue.id;
			loggedInUser.username = cookieValue.username;
			loggedInUser.admin = cookieValue.admin;
			loggedInUser.token = cookieValue;

			this.user = loggedInUser;
			this.isLoggedIn = true;
		}
	}

	public isAdmin() {
		return this.user != undefined && this.user.admin == true;
	}

	/**
	 * Register a user
	 * @param user the user to register
	 */
	public register(user: UserRequest): Observable<any> {
		return this.httpClient.post<UserRequest>(`${this.apiUrl}register`, user);
	}

	/**
	 * Login a user
	 * @param user the user to login
	 */
	public login(user: UserRequest): Observable<any> {
		return this.httpClient.post<UserRequest>(`${this.apiUrl}login`, user, { observe: 'response' });
	}

	/**
	 * Logout a user
	 */
	public logout(): boolean {
		this.user = null;
		this.isLoggedIn = false;

		this.cookieService.delete(this.cookieName);
		return true;
	}

	/**
	 * Generate a upload secret
	 */
	public generateUploadSecret(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}generate-upload-secret`);
	}

	/**
	 * Create a cookie
	 * @param name the name of the cookie
	 * @param value the value of the cookie
	 */
	public setCookie(name: string, value: string): void {
		this.cookieService.set(name, value, new Date().setDate(new Date().getDate() + 19), "/", environment.domain, false, "Strict");
	}

	/**
	 * Get the value of a cookie
	 * @param name the name of the cookie
	 */
	public getCookie(name: string): string {
		return this.cookieService.get(name);
	}
}
