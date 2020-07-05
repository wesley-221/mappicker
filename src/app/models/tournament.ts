import { Gamemodes } from "./misc-osu";
import { User } from "./authentication/user";
import { Mappool } from "./mappool/mappool";

export class Tournament {
	id: number;
	tournamentName: String;
	defaultGamemode: Gamemodes;
	mappickers: User[] = [];
	mappools: Mappool[] = [];
	createdBy: User;

	/**
	 * Get a mappool by the given id
	 * @param mappoolId
	 */
	public getMappoolById(mappoolId: number): Mappool {
		for (let mappool in this.mappools) {
			if (this.mappools[mappool].id == mappoolId) {
				return this.mappools[mappool];
			}
		}

		return null;
	}

	/**
	 * Get all modbracket names
	 */
	public getAllModBrackets(): string[] {
		let allModBrackets: string[] = [];

		for (let mappool in this.mappools) {
			for (let modBracket in this.mappools[mappool].modBrackets) {
				if (allModBrackets.indexOf(this.mappools[mappool].modBrackets[modBracket].modBracketName) == -1) {
					allModBrackets.push(this.mappools[mappool].modBrackets[modBracket].modBracketName);
				}
			}
		}

		return allModBrackets;
	}

	/**
	 * Check if the given user is the creator of the tournament
	 * @param user the user to check
	 */
	public isCreator(user: User) {
		return this.createdBy.id == user.id;
	}

	/**
	 * Get the amount of mappools in the tournament
	 */
	public mappoolCount() {
		return this.mappools.length;
	}

	/**
	 * Add a user to the mappicker team
	 * @param user the user to add as a mappicker
	 */
	public addMappicker(user: User): void {
		this.mappickers.push(user);
	}

	/**
	 * Remove a user from the mappicker team
	 * @param user the user to remove from the mappickers
	 */
	public removeMappicker(user: User): void {
		this.mappickers.splice(this.mappickers.indexOf(user), 1);
	}

	/**
	 * Add a mappool to the tournament
	 * @param mappool the mappool to add to the tournament
	 */
	public addMappool(mappool: Mappool): void {
		this.mappools.push(mappool);
	}

	/**
	 * Remove a mappool from the tournament
	 * @param mappool the mappool to remove from the tournament
	 */
	public removeMappool(mappool: Mappool): void {
		this.mappools.splice(this.mappools.indexOf(mappool), 1);
	}

	/**
	 * Update a mappool with the
	 * @param mappool the mappool to update
	 */
	public updateMappool(mappool: Mappool): void {
		for (let i in this.mappools) {
			if (this.mappools[i].id == mappool.id) {
				this.mappools[i] = Mappool.makeTrueCopy(mappool);
			}
		}
	}

	/**
	 * Get the image from the gamemode
	 */
	public getGamemodeImage() {
		return `/assets/images/gamemodes/mode-${this.defaultGamemode}.png`;
	}

	/**
	 * Serialize the json to a tournament object
	 * @param json
	 */
	public static serializeJson(json: any): Tournament {
		const newTournament = new Tournament();

		newTournament.id = json.id;
		newTournament.tournamentName = json.tournamentName;
		newTournament.defaultGamemode = Gamemodes[Gamemodes[json.defaultGamemode]];

		for (let mappicker in json.mappickers) {
			newTournament.addMappicker(User.serializeJson(json.mappickers[mappicker]));
		}

		for (let mappool in json.mappools) {
			newTournament.addMappool(Mappool.serializeJson(json.mappools[mappool]));
		}

		newTournament.createdBy = User.serializeJson(json.createdBy);

		return newTournament;
	}

	/**
	 * Make a true copy of the tournament
	 * @param tournament
	 */
	public static makeTrueCopy(tournament: Tournament): Tournament {
		const newTournament = new Tournament();

		newTournament.id = tournament.id;
		newTournament.tournamentName = tournament.tournamentName;
		newTournament.defaultGamemode = tournament.defaultGamemode;

		for (let mappicker in tournament.mappickers) {
			newTournament.addMappicker(User.makeTrueCopy(tournament.mappickers[mappicker]));
		}

		for (let mappool in tournament.mappools) {
			newTournament.addMappool(Mappool.makeTrueCopy(tournament.mappools[mappool]));
		}

		newTournament.createdBy = User.makeTrueCopy(tournament.createdBy);

		return newTournament;
	}
}
