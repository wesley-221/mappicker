import { Mods } from "../misc-osu";

export class ModBracket {
	id: number;
	index: number;
	modBracketName: string = "Unnamed mod bracket";
	mods: Mods[];
	mapsRequired: number = 1;
	modBracketColour: string;

	/**
	 * Get the maps required as an array
	 */
	public getMapsRequiredAsArray() {
		let mapsRequired = [];

		for (let i = 0; i < this.mapsRequired; i++) {
			mapsRequired.push(i);
		}

		return mapsRequired;
	}

	/**
	 * Serialize the json to a tournament object
	 * @param json
	 */
	public static serializeJson(json: any): ModBracket {
		const newModBracket = new ModBracket();

		newModBracket.id = json.id;
		newModBracket.modBracketName = json.modBracketName;
		newModBracket.mods = json.mods;
		newModBracket.mapsRequired = json.mapsRequired;
		newModBracket.modBracketColour = json.modBracketColour;

		return newModBracket;
	}

	/**
	 * Make a true copy of the modbracket
	 * @param modBracket
	 */
	public static makeTrueCopy(modBracket: ModBracket): ModBracket {
		const newModBracket = new ModBracket();

		newModBracket.id = modBracket.id;
		newModBracket.index = modBracket.index;
		newModBracket.modBracketName = modBracket.modBracketName;
		newModBracket.mods = modBracket.mods;
		newModBracket.mapsRequired = modBracket.mapsRequired;
		newModBracket.modBracketColour = (modBracket.modBracketColour == (null || undefined) ? null : modBracket.modBracketColour);

		return newModBracket;
	}
}
