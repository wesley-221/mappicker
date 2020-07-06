import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../models/tournament';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTournamentComponent } from '../../dialogs/delete-tournament/delete-tournament.component';
import { TournamentService } from '../../../services/tournament.service';
import { AuthenticationService } from '../../../services/authentication.service';

export interface TournamentDeleteDialogData {
	tournament: Tournament;
}

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
	@Input() tournament: Tournament;

	constructor(private route: Router, private dialog: MatDialog, private tournamentService: TournamentService, public authService: AuthenticationService) { }
	ngOnInit(): void { }

	navigateToTournament(tournament: Tournament, event: any): void {
		// Check if click wasn't on a button
		if (event.srcElement.className.search(/mat-icon|mat-mini-fab|mat-button-wrapper/) === -1) {
			this.route.navigate(['tournament', tournament.id]);
		}
	}

	deleteTournament(tournament: Tournament): void {
		const dialogRef = this.dialog.open(DeleteTournamentComponent, {
			data: {
				tournament: tournament
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === true) {
				this.tournamentService.deleteTournament(tournament).subscribe(() => {
					this.tournamentService.importTournaments();
				});
			}
		})
	}
}
