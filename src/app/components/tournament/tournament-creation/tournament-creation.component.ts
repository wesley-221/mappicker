import { Component, OnInit } from '@angular/core';
import { AllGamemodes } from '../../../models/misc-osu';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tournament } from '../../../models/tournament';
import { User } from '../../../models/authentication/user';
import { UserService } from '../../../services/user.service';
import { TournamentService } from '../../../services/tournament.service';

@Component({
	selector: 'app-tournament-creation',
	templateUrl: './tournament-creation.component.html',
	styleUrls: ['./tournament-creation.component.scss']
})
export class TournamentCreationComponent implements OnInit {
	tournamentForm: FormGroup;
	searchValue: string;

	allGamemodes = AllGamemodes;
	tournament: Tournament;
	allUsers: User[] = [];

	tournamentCreated = false;

	constructor(private userService: UserService, private tournamentService: TournamentService) {
		this.tournament = new Tournament();

		this.tournamentForm = new FormGroup({
			'tournament-name': new FormControl('', [
				Validators.required
			]),
			'tournament-gamemode': new FormControl('', [
				Validators.required
			])
		});
	}

	ngOnInit(): void { }

	createTournament(): void {
		if (!this.tournamentForm.invalid) {
			this.tournament.tournamentName = this.tournamentForm.get('tournament-name').value;
			this.tournament.defaultGamemode = this.tournamentForm.get('tournament-gamemode').value;

			this.tournamentService.createTournament(this.tournament).subscribe(response => {
				this.tournament = Tournament.serializeJson(response);
				this.tournamentCreated = true;

				this.tournamentService.importTournaments();

				// Delay by a few miliseconds
				setTimeout(() => {
					document.getElementById('tournamentCreatedAlert').scrollIntoView();
				}, 100);
			});
		}
		else {
			this.tournamentForm.markAllAsTouched();
		}
	}
}
