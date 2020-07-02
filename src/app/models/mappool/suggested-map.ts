import { Tournament } from "../tournament";
import { Beatmap } from "./beatmap";
import { Mappool } from "./mappool";
import { ModBracket } from "./mod-bracket";
import { User } from "../authentication/user";

export class SuggestedMap {
	tournament: Tournament;
	beatmap: Beatmap;
	mappool: Mappool;
	modBrackets: ModBracket[] = [];
	submittedBy: User;

	/**
	 * Get all the modbracket names seperated by a comma
	 */
	public getModBracketNames() {
		let modBrackets: string[] = [];

		for (let modBracket in this.modBrackets) {
			modBrackets.push(this.modBrackets[modBracket].modBracketName);
		}

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

		for (let modBracket in json.modBrackets) {
			newSuggestedMap.modBrackets.push(ModBracket.serializeJson(json.modBrackets[modBracket]));
		}

		newSuggestedMap.submittedBy = User.serializeJson(json.submittedBy);

		return newSuggestedMap;
	}
}
