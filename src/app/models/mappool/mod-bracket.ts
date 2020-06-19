import { Mods } from "../misc-osu";

export class ModBracket {
	id: number;
	index: number;
	modBracketName: String = "Unnamed mod bracket";
	mods: Mods[];
	mapsRequired: number = 1;

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

		return newModBracket;
	}

	/**
	 * Make a true copy of the modbracket
	 * @param modBracket
	 */
	public static makeTrueCopy(modBracket: ModBracket): ModBracket {
		const newModBracket = new ModBracket();

		newModBracket.id = modBracket.id;
		newModBracket.modBracketName = modBracket.modBracketName;
		newModBracket.mods = modBracket.mods;
		newModBracket.mapsRequired = modBracket.mapsRequired;

		return newModBracket;
	}
}
