import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from '../../../models/tournament';
import { TournamentService } from '../../../services/tournament.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-tournament-view',
	templateUrl: './tournament-view.component.html',
	styleUrls: ['./tournament-view.component.scss']
})
export class TournamentViewComponent implements OnInit {
	breadCrumbs: any = [];
	tournament: Tournament;
	tournamentForm: FormGroup;

	tournamentUpdated = false;

	constructor(private route: ActivatedRoute, private tournamentService: TournamentService, public authService: AuthenticationService) {
		this.tournamentForm = new FormGroup({
			'tournament-name': new FormControl('', [
				Validators.required
			]),
			'tournament-gamemode': new FormControl('', [
				Validators.required
			])
		});

		this.route.params.subscribe(params => {
			this.tournamentService.finishedImporting().subscribe(res => {
				if (res == true) {
					const thisTournament = this.tournamentService.getTournamentById(params.id);
					this.tournament = Tournament.makeTrueCopy(thisTournament);

					this.breadCrumbs = [];

					this.breadCrumbs.push(['tournament overview', '/tournament-overview']);
					this.breadCrumbs.push([this.tournament.tournamentName])

					this.tournamentForm.get('tournament-name').setValue(this.tournament.tournamentName);
					this.tournamentForm.get('tournament-gamemode').setValue(this.tournament.defaultGamemode);
				}
			})
		});
	}

	ngOnInit(): void { }

	updateTournament(): void {
		if (!this.tournamentForm.invalid) {
			this.tournament.tournamentName = this.tournamentForm.get('tournament-name').value;
			this.tournament.defaultGamemode = this.tournamentForm.get('tournament-gamemode').value;

			this.tournamentService.updateTournament(this.tournament).subscribe(response => {
				this.tournament = Tournament.serializeJson(response);
				this.tournamentUpdated = true;

				this.tournamentService.importTournaments();

				// Delay by a few miliseconds
				setTimeout(() => {
					document.getElementById('tournamentUpdatedAlert').scrollIntoView();
				}, 100);
			});
		}
		else {
			this.tournamentForm.markAllAsTouched();
		}
	}
}
