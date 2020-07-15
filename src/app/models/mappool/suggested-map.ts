import { Tournament } from '../tournament';
import { Beatmap } from './beatmap';
import { Mappool } from './mappool';
import { ModBracket } from './mod-bracket';
import { User } from '../authentication/user';

export class SuggestedMap {
	tournament: Tournament;
	beatmap: Beatmap;
	mappool: Mappool;
	modBrackets: ModBracket[] = [];
	submittedBy: User;

	/**
	 * Get all the modbracket names seperated by a comma
	 */
	public getModBracketNames(): string {
		const modBrackets: string[] = [];

		this.modBrackets.forEach(modBracket => {
			modBrackets.push(modBracket.modBracketName);
		});

		return modBrackets.join(', ');
	}

	/**
	 * Serialize the json to a suggestedmap object
	 * @param json
	 */
	public static serializeJson(json: any): SuggestedMap {
		const newSuggestedMap = new SuggestedMap();

		newSuggestedMap.tournament = Tournament.serializeJson(json.tournament);
		newSuggestedMap.beatmap = Beatmap.serializeJson(json.beatmap);
		newSuggestedMap.mappool = Mappool.serializeJson(json.mappool);

		for (const modBracket in json.modBrackets) {
			newSuggestedMap.modBrackets.push(ModBracket.serializeJson(json.modBrackets[modBracket]));
		}

		newSuggestedMap.submittedBy = User.serializeJson(json.submittedBy);

		return newSuggestedMap;
	}

	/**
	 * Make a true copy of the suggested map
	 * @param suggestedMap
	 */
	public static makeTrueCopy(suggestedMap: SuggestedMap): SuggestedMap {
		const newSuggestedMap = new SuggestedMap();

		newSuggestedMap.tournament = Tournament.serializeJson(suggestedMap.tournament);
		newSuggestedMap.beatmap = Beatmap.serializeJson(suggestedMap.beatmap);
		newSuggestedMap.mappool = Mappool.serializeJson(suggestedMap.mappool);

		suggestedMap.modBrackets.forEach(modBracket => {
			newSuggestedMap.modBrackets.push(ModBracket.serializeJson(modBracket));
		});

		newSuggestedMap.submittedBy = User.serializeJson(suggestedMap.submittedBy);

		return newSuggestedMap;
	}
}
