import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TournamentService {
	private readonly apiUrl: string = environment.apiUrl;
	allTournaments: Tournament[] = [];

	private finishedImporting$: BehaviorSubject<boolean>;

	constructor(private httpClient: HttpClient) {
		this.finishedImporting$ = new BehaviorSubject<boolean>(false);

		this.importTournaments();
	}

	/**
	 * Import all tournaments available to the current user
	 */
	importTournaments(): void {
		this.allTournaments = [];

		this.finishedImporting$.next(false);

		this.httpClient.get<Tournament[]>(`${this.apiUrl}wypicker/tournament`).subscribe(response => {
			response.forEach(tournament => {
				this.allTournaments.push(Tournament.serializeJson(tournament));
			});

			this.finishedImporting$.next(true);
		});
	}

	/**
	 * Get the amount of tournaments available to you
	 */
	getTournamentCount(): number {
		return this.allTournaments.length;
	}

	/**
	 * Endpoint to create a new tournament
	 * @param tournament
	 */
	createTournament(tournament: Tournament): Observable<Tournament> {
		return this.httpClient.post<Tournament>(`${this.apiUrl}wypicker/tournament`, tournament);
	}

	/**
	 * Endpoint to update an existing tournament
	 * @param tournament
	 */
	updateTournament(tournament: Tournament): Observable<Tournament> {
		return this.httpClient.post<Tournament>(`${this.apiUrl}wypicker/tournament`, tournament);
	}

	/**
	 * Endpoint to delete an existing tournament
	 * @param tournament
	 */
	deleteTournament(tournament: Tournament): Observable<any> {
		return this.httpClient.delete<Tournament>(`${this.apiUrl}wypicker/tournament/${tournament.id}`);
	}

	/**
	 * Get a tournament by the given id
	 * @param tournamentId the id of the tournament to get
	 */
	getTournamentById(tournamentId: number): Tournament {
		for (const tournament of this.allTournaments) {
			if (tournament.id === tournamentId) {
				return tournament;
			}
		}

		return null;
	}

	/**
	 * Check if the tournaments have finished importing
	 * @returns true if finished, false if not
	 */
	finishedImporting(): Observable<boolean> {
		return this.finishedImporting$;
	}
}
