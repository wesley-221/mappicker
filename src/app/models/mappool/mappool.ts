import { ModBracket } from "./mod-bracket";

export class Mappool {
	id: number;
	mappoolName: String;
	bestOf: String;
	modBrackets: ModBracket[] = [];

	/**
	 * Get all mod brackets from the given ids
	 * @param modBracketIds
	 */
	public getModBracketsByIds(modBracketIds: number[]): ModBracket[] {
		let modBrackets: ModBracket[] = [];

		for (let modBracket in this.modBrackets) {
			if (modBracketIds.indexOf(this.modBrackets[modBracket].id) > -1) {
				modBrackets.push(this.modBrackets[modBracket]);
			}
		}

		return modBrackets;
	}

	/**
	 * Add a modbracket to the mappool
	 * @param modBracket the modbracket to add
	 */
	public addModBracket(modBracket: ModBracket): void {
		this.modBrackets.push(modBracket);
	}

	/**
	 * Remove a modbracket from the mappool
	 * @param modBracket the modbracket to remove
	 */
	public removeModBracket(modBracket: ModBracket): void {
		this.modBrackets.splice(this.modBrackets.indexOf(modBracket), 1);
	}

	/**
	 * Get the amount of modbrackets in the mappool
	 */
	public modBracketCount() {
		return this.modBrackets.length;
	}

	/**
	 * Serialize the json to a mappool object
	 * @param json
	 */
	public static serializeJson(json: any): Mappool {
		const newMappool = new Mappool();

		newMappool.id = json.id;
		newMappool.mappoolName = json.mappoolName;
		newMappool.bestOf = json.bestOf;

		for (let modBracket in json.modBrackets) {
			newMappool.modBrackets.push(ModBracket.serializeJson(json.modBrackets[modBracket]));
		}

		return newMappool;
	}

	/**
	 * Make a true copy of the mappool
	 * @param mappool
	 */
	public static makeTrueCopy(mappool: Mappool): Mappool {
		const newMappool = new Mappool();

		newMappool.id = mappool.id;
		newMappool.mappoolName = mappool.mappoolName;
		newMappool.bestOf = mappool.bestOf;

		for (let modBracket in mappool.modBrackets) {
			newMappool.modBrackets.push(ModBracket.makeTrueCopy(mappool.modBrackets[modBracket]));
		}

		return newMappool;
	}
}
