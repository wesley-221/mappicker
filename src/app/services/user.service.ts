import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly apiUrl: string = environment.apiUrl;

	constructor(private httpClient: HttpClient) { }

	/**
	 * Get a list with all the users
	 */
	public getUserList() {
		return this.httpClient.get(`${this.apiUrl}users/list`)
	}
}
