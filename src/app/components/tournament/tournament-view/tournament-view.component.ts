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
	breadCrumbs: any = [['tournament overview', '/tournament-overview']];
	tournament: Tournament;
	tournamentForm: FormGroup;

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
				if(res == true) {
					const thisTournament = this.tournamentService.getTournamentById(params.id);
					this.tournament = Tournament.makeTrueCopy(thisTournament);

					this.breadCrumbs.push([this.tournament.tournamentName])
				}
			})
		});
	}

	ngOnInit(): void { }
}
