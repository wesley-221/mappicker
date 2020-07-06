import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuggestAMapDialog } from '../../mappool/mappool-overview/mappool-overview.component';
import { OsuService } from '../../../services/osu.service';
import { BeatmapRegex, ValidGamemodes } from '../../../models/misc-osu';
import { Beatmap } from '../../../models/mappool/beatmap';
import { Mappool } from '../../../models/mappool/mappool';
import { Tournament } from '../../../models/tournament';
import { ModBracket } from '../../../models/mappool/mod-bracket';
import { MappoolService } from '../../../services/mappool.service';
import { SuggestedMap } from '../../../models/mappool/suggested-map';

@Component({
	selector: 'app-suggest-a-map',
	templateUrl: './suggest-a-map.component.html',
	styleUrls: ['./suggest-a-map.component.scss']
})
export class SuggestAMapComponent {
	selectedTournament: Tournament;
	selectedMappool: Mappool;
	selectedModBrackets: ModBracket[];
	foundBeatmap: Beatmap;

	beatmapLink = 'https://osu.ppy.sh/beatmapsets/431497#fruits/964594';
	selectedMappoolId: number;
	selectedModBracketIds: number[];

	mapIsSuggestedString: string;

	constructor(@Inject(MAT_DIALOG_DATA) public data: SuggestAMapDialog, private osuService: OsuService, private mappoolService: MappoolService) {
		this.selectedTournament = data.tournament;
	}

	getMapData(): void {
		const beatmap = new RegExp(BeatmapRegex).exec(this.beatmapLink);

		// Invalid beatmap url
		if (beatmap == null) {
			return;
		}

		// TODO: Add this one when its actually required again
		// const beatmapSetId = parseInt(beatmap[1]);
		const gamemode = beatmap[2];
		const beatmapId = parseInt(beatmap[3]);

		// Invalid gamemode
		if (!ValidGamemodes.includes(gamemode)) {
			return;
		}

		// TODO: Add gamemode whenever it's available with the api
		this.osuService.getBeatmapData(beatmapId).subscribe(resp => {
			this.foundBeatmap = Beatmap.serializeJson(resp);

			const suggestedMap: SuggestedMap = new SuggestedMap();

			suggestedMap.tournament = this.selectedTournament;
			suggestedMap.beatmap = this.foundBeatmap;
			suggestedMap.mappool = this.selectedMappool;
			suggestedMap.modBrackets = this.selectedModBrackets;

			// Check if the beatmap has already been suggested
			this.mappoolService.isMapSuggested(suggestedMap).subscribe(response => {
				const foundBeatmaps: SuggestedMap[] = [];
				let pickedModBrackets: string[] = [];

				// Serialize the result
				for (const suggestedMap in response) {
					foundBeatmaps.push(SuggestedMap.serializeJson(response[suggestedMap]));
				}

				// The beatmap has been suggested once
				if (foundBeatmaps.length == 1) {
					foundBeatmaps[0].modBrackets.forEach(modBracket => {
						pickedModBrackets.push(modBracket.modBracketName);
					})

					this.mapIsSuggestedString = `This beatmap was already suggested by <b>${foundBeatmaps[0].submittedBy.username}<b> for <b>${foundBeatmaps[0].mappool.mappoolName}</b>: <b>${pickedModBrackets.join(', ')}</b>.`;
				}
				// The beatmap has been suggested more than once
				else if (foundBeatmaps.length > 1) {
					this.mapIsSuggestedString = 'This beatmap was already suggested on multiple occasions: <ul>';

					foundBeatmaps.forEach(suggestedMap => {
						pickedModBrackets = [];

						suggestedMap.modBrackets.forEach(modBracket => {
							pickedModBrackets.push(modBracket.modBracketName);
						});

						this.mapIsSuggestedString += `<li>Suggested by <b>${suggestedMap.submittedBy.username}</b> for <b>${suggestedMap.mappool.mappoolName}</b>: <b>${pickedModBrackets.join(', ')}</b></li>`
					});

					this.mapIsSuggestedString += '</ul>';
				}
				// The beatmap has not been suggested yet
				else {
					this.mapIsSuggestedString = null;
				}
			});
		});
	}

	onMappoolChange(): void {
		this.selectedMappool = this.selectedTournament.getMappoolById(this.selectedMappoolId);
		this.selectedModBrackets = null;
	}

	onModBracketChange(): void {
		this.selectedModBrackets = this.selectedMappool.getModBracketsByIds(this.selectedModBracketIds);
	}

	returnSuggestedMap(): SuggestAMapDialog {
		const suggestedMap: SuggestAMapDialog = {
			tournament: this.selectedTournament,
			beatmap: this.foundBeatmap,
			mappool: this.selectedMappool,
			modBrackets: this.selectedModBrackets,
			submittedBy: null
		};

		return suggestedMap;
	}
}
