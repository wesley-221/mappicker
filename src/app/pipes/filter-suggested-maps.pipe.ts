import { Pipe, PipeTransform } from '@angular/core';
import { SuggestedMap } from '../models/mappool/suggested-map';

@Pipe({
	name: 'filterSuggestedMaps'
})
export class FilterSuggestedMapsPipe implements PipeTransform {
	transform(allSuggestedMaps: SuggestedMap[], filterByText: string, mappool: string[], modBrackets: string[], mappickers: string[]): SuggestedMap[] {
		filterByText = filterByText.toLowerCase();

		let returnSuggestedMaps: SuggestedMap[];

		// Filters for the generic text
		if (filterByText !== undefined) {
			returnSuggestedMaps = allSuggestedMaps.filter(suggestedMap => {
				return suggestedMap.beatmap.getFullBeatmapName().toLowerCase().includes(filterByText) ||
					suggestedMap.mappool.mappoolName.toLowerCase().includes(filterByText) ||
					suggestedMap.submittedBy.username.toLowerCase().includes(filterByText) ||
					suggestedMap.getModBracketNames().toLowerCase().includes(filterByText);
			});
		}

		// Check and apply the mappool filter if it has been selected
		if (mappool !== undefined && mappool.length > 0) {
			returnSuggestedMaps = returnSuggestedMaps.filter(suggestedMap => {
				return mappool.includes(suggestedMap.mappool.mappoolName);
			});
		}

		// Check and apply the modbrackets filter if it has been selected
		if (modBrackets !== undefined && modBrackets.length > 0) {
			returnSuggestedMaps = returnSuggestedMaps.filter(suggestedMap => {
				return modBrackets.some(modBracket => suggestedMap.getModBracketNames().includes(modBracket));
			});
		}

		// Check and apply the mappicker filter if it has been selected
		if (mappickers !== undefined && mappickers.length > 0) {
			returnSuggestedMaps = returnSuggestedMaps.filter(suggestedMap => {
				return mappickers.includes(suggestedMap.submittedBy.username);
			});
		}

		return returnSuggestedMaps;
	}
}
