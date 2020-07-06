import { Component, OnInit, Input } from '@angular/core';
import { Mappool } from '../../../../models/mappool/mappool';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMappoolComponent } from '../../../dialogs/delete-mappool/delete-mappool.component';
import { Tournament } from '../../../../models/tournament';
import { AuthenticationService } from '../../../../services/authentication.service';
import { TournamentService } from '../../../../services/tournament.service';

export interface MappoolDeleteDialogData {
	mappool: Mappool;
}

@Component({
	selector: 'app-mappool',
	templateUrl: './mappool.component.html',
	styleUrls: ['./mappool.component.scss']
})
export class MappoolComponent implements OnInit {
	@Input() mappool: Mappool;
	@Input() tournament: Tournament;

	constructor(private route: Router, private dialog: MatDialog, public authService: AuthenticationService, private tournamentService: TournamentService) { }
	ngOnInit(): void { }

	navigateMappool(mappool: Mappool, event): void {
		// Check if click wasn't on a button
		if (event.srcElement.className.search(/mat-icon|mat-mini-fab|mat-button-wrapper/) == -1) {
			this.route.navigate(['mappool', this.tournament.id, mappool.id]);
		}
	}

	editMappool(mappool: Mappool): void {
		this.route.navigate(['mappool-edit', this.tournament.id, mappool.id]);
	}

	deleteMappool(): void {
		const dialogRef = this.dialog.open(DeleteMappoolComponent, {
			data: {
				mappool: this.mappool
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == true) {
				this.tournament.removeMappool(this.mappool);

				this.tournamentService.updateTournament(this.tournament).subscribe(() => {
					this.tournamentService.importTournaments();
				});
			}
		})
	}
}
