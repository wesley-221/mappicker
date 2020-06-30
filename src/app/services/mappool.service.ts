import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SuggestedMap } from '../models/mappool/suggested-map';

@Injectable({
	providedIn: 'root'
})
export class MappoolService {
	private readonly apiUrl: string = environment.apiUrl;

	constructor(private httpClient: HttpClient) { }

	/**
	 * Suggest a map
	 * @param suggestedMap the map to suggest
	 */
	public suggestAMap(suggestedMap: SuggestedMap) {
		return this.httpClient.post<SuggestedMap>(`${this.apiUrl}wypicker/suggest-a-map`, suggestedMap);
	}

	/**
	 * Check if a map has been suggested already
	 * @param suggestedMap the map to check
	 */
	public isMapSuggested(suggestedMap: SuggestedMap) {
		return this.httpClient.post<SuggestedMap>(`${this.apiUrl}wypicker/is-suggested`, suggestedMap);
	}
}
