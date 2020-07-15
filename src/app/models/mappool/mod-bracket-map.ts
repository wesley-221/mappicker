import { SuggestedMap } from './suggested-map';

export class ModBracketMap {
	id: number;
	index: number;
	map: SuggestedMap;

	constructor() {
		this.id = null;
		this.index = null;
		this.map = null;
	}

	/**
	 * Serialize the json to a mod bracket map object
	 * @param json
	 */
	public static serializeJson(json: any): ModBracketMap {
		const newModBracketMap = new ModBracketMap();

		newModBracketMap.id = json.id;
		newModBracketMap.index = json.index;
		newModBracketMap.map = SuggestedMap.serializeJson(json.map);

		return newModBracketMap;
	}

	/**
	 * Make a true copy of the mod bracket map
	 * @param modBracket
	 */
	public static makeTrueCopy(modBracketMap: ModBracketMap): ModBracketMap {
		const newModBracketMap = new ModBracketMap();

		newModBracketMap.id = modBracketMap.id;
		newModBracketMap.index = modBracketMap.index;
		newModBracketMap.map = SuggestedMap.makeTrueCopy(modBracketMap.map);

		return newModBracketMap;
	}
}
