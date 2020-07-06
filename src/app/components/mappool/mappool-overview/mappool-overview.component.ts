import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../models/tournament';
import { MatDialog } from '@angular/material/dialog';
import { SuggestAMapComponent } from '../../dialogs/suggest-a-map/suggest-a-map.component';
import { Beatmap } from '../../../models/mappool/beatmap';
import { Mappool } from '../../../models/mappool/mappool';
import { ModBracket } from '../../../models/mappool/mod-bracket';
import { MappoolService } from '../../../services/mappool.service';
import { AlertService } from '../../../services/alert.service';
import { User } from '../../../models/authentication/user';
import { SuggestedMap } from '../../../models/mappool/suggested-map';
import { TournamentService } from '../../../services/tournament.service';

export interface SuggestAMapDialog {
	tournament: Tournament;
	beatmap: Beatmap;
	mappool: Mappool;
	modBrackets: ModBracket[];
	submittedBy: User;
}

@Component({
	selector: 'app-mappool-overview',
	templateUrl: './mappool-overview.component.html',
	styleUrls: ['./mappool-overview.component.scss']
})
export class MappoolOverviewComponent implements OnInit {
	@Input() tournament: Tournament;

	constructor(
		private dialog: MatDialog,
		private mappoolService: MappoolService,
		private alertService: AlertService,
		private tournamentService: TournamentService) { }
	ngOnInit(): void { }

	suggestMap(tournament: Tournament): void {
		const dialogRef = this.dialog.open(SuggestAMapComponent, {
			data: {
				tournament: tournament
			},
			width: '80%'
		});

		dialogRef.afterClosed().subscribe((suggestedMap: SuggestedMap) => {
			if (suggestedMap != null) {
				this.mappoolService.suggestAMap(suggestedMap).subscribe(() => {
					const modBrackets = [];

					suggestedMap.modBrackets.forEach(modBracket => {
						modBrackets.push(modBracket.modBracketName);
					})

					this.tournamentService.importTournaments();

					this.alertService.success(`Successfully suggested the map <b>${suggestedMap.beatmap.getFullBeatmapName()}</b> for <b>${suggestedMap.mappool.mappoolName}</b> (<b>${modBrackets.join(', ')}</b>).`, { duration: 5 });
				});
			}
		});
	}
}
