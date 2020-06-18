import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserRequest } from '../models/user-request';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from "jwt-decode";
import { StoreService } from './store.service';

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {
	public readonly authName: string = "auth";
	private readonly apiUrl: string = environment.apiUrl;
	public user: User;
	public isLoggedIn: boolean;
	public authToken: String;

	constructor(private httpClient: HttpClient, private storeService: StoreService) {
		this.authToken = this.storeService.get(this.authName);
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
		this.authToken = null;

		this.storeService.delete(this.authName);
		return true;
	}

	/**
	 * Generate a upload secret
	 */
	public generateUploadSecret(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}generate-upload-secret`);
	}

	/**
	 * Cache the authentication token
	 * @param name
	 */
	public cacheAuthenticationToken(name: string) {
		this.storeService.set(this.authName, name);
	}

	/**
	 * Validate the currently saved token
	 * @param token
	 */
	public validateToken(token: String) {
		return this.httpClient.get(`${this.apiUrl}validate-token`);
	}
}
