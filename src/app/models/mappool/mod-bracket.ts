import { Mods } from '../misc-osu';
import { ModBracketMap } from './mod-bracket-map';

export class ModBracket {
	id: number;
	index: number;
	modBracketName: string;
	mods: Mods[];
	mapsRequired: number;
	modBracketColour: string;
	allMaps: ModBracketMap[];
	indexCount: number;

	constructor() {
		this.modBracketName = 'Unnamed mod bracket';
		this.mods = [];
		this.mapsRequired = 1;
		this.modBracketColour = null;
		this.allMaps = [];
		this.indexCount = 1;
	}

	/**
	 * Serialize the json to a modbracket object
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
