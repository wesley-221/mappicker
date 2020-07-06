import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../models/tournament';
import { MappoolService } from '../../../services/mappool.service';
import { SuggestedMap } from '../../../models/mappool/suggested-map';
import { ElectronService } from '../../../services/electron.service';
import { DeleteSuggestedMapComponent } from '../../dialogs/delete-suggested-map/delete-suggested-map.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { TournamentService } from '../../../services/tournament.service';

export interface DeleteSuggestedMapDialog {
	suggestedMap: SuggestedMap;
}

@Component({
	selector: 'app-suggested-maps-list',
	templateUrl: './suggested-maps-list.component.html',
	styleUrls: ['./suggested-maps-list.component.scss']
})
export class SuggestedMapsListComponent implements OnInit {
	@Input() tournament: Tournament;

	allSuggestedMaps: SuggestedMap[] = [];

	filterByText = '';
	filterByMappool: string[];
	filterByMods: string[];
	filterByMappicker: string[];

	constructor(
		private mappoolService: MappoolService,
		private dialog: MatDialog,
		private alertService: AlertService,
		private tournamentService: TournamentService,
		public electronService: ElectronService) { }

	ngOnInit(): void {
		this.importSuggestedMaps(this.tournament);

		this.tournamentService.finishedImporting().subscribe(updated => {
			if (updated == true) {
				this.importSuggestedMaps(this.tournament);
			}
		});
	}

	/**
	 * Open a dialog to delete the suggested map
	 * @param suggestedMap
	 */
	deleteSuggestedMap(suggestedMap: SuggestedMap): void {
		const dialogRef = this.dialog.open(DeleteSuggestedMapComponent, {
			data: {
				suggestedMap: suggestedMap
			}
		});

		dialogRef.afterClosed().subscribe((suggestedMap: SuggestedMap) => {
			this.mappoolService.deleteSuggestedMap(suggestedMap).subscribe(() => {
				this.tournamentService.importTournaments();

				this.allSuggestedMaps.splice(this.allSuggestedMaps.indexOf(suggestedMap), 1);

				this.alertService.success('Successfully deleted the suggested map.');
			});
		});
	}

	/**
	 * Import the suggested maps
	 * @param tournament
	 */
	importSuggestedMaps(tournament: Tournament): void {
		this.mappoolService.getAllSuggestedMapsFromTournament(tournament).subscribe(response => {
			this.allSuggestedMaps = [];

			response.forEach(suggestedMap => {
				this.allSuggestedMaps.push(SuggestedMap.serializeJson(suggestedMap));
			});
		});
	}

	/**
	 * Manually trigger the pipe, doesn't trigger on select
	 */
	triggerPipe(): void {
		this.filterByText = this.filterByText;
	}

	/**
	 * Clear filters
	 * @param id
	 */
	clear(id: number): void {
		switch (id) {
			case 1:
				this.filterByText = undefined;
				break;
			case 2:
				this.filterByMappool = undefined;
				break;

			case 3:
				this.filterByMods = undefined;
				break;

			case 4:
				this.filterByMappicker = undefined;
				break;

			default:
				break;
		}

		this.triggerPipe();
	}
}
