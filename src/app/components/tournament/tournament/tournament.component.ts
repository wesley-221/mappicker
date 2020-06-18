import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../models/tournament';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
	@Input() tournament: Tournament;

	constructor(private route: Router) { }
	ngOnInit(): void { }

	navigateToTournament(tournament: Tournament) {
		this.route.navigate(['tournament', tournament.id]);
	}
}
