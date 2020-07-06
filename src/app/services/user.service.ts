import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/authentication/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly apiUrl: string = environment.apiUrl;

	constructor(private httpClient: HttpClient) { }

	/**
	 * Get a list with all the users
	 */
	public getUserList(): Observable<User[]> {
		return this.httpClient.get<User[]>(`${this.apiUrl}users/list`);
	}
}
