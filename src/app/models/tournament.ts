import { Gamemodes } from './misc-osu';
import { User } from './authentication/user';
import { Mappool } from './mappool/mappool';

export class Tournament {
	id: number;
	tournamentName: string;
	defaultGamemode: Gamemodes;
	mappickers: User[] = [];
	mappools: Mappool[] = [];
	createdBy: User;

	/**
	 * Get a mappool by the given id
	 * @param mappoolId
	 */
	public getMappoolById(mappoolId: number): Mappool {
		for (const mappool of this.mappools) {
			if (mappool.id == mappoolId) {
				return mappool;
			}
		}

		return null;
	}

	/**
	 * Get all modbracket names
	 */
	public getAllModBrackets(): string[] {
		const allModBrackets: string[] = [];

		this.mappools.forEach(mappool => {
			mappool.modBrackets.forEach(modBracket => {
				if (!allModBrackets.includes(modBracket.modBracketName)) {
					allModBrackets.push(modBracket.modBracketName);
				}
			});
		});

		return allModBrackets;
	}

	/**
	 * Check if the given user is the creator of the tournament
	 * @param user the user to check
	 */
	public isCreator(user: User): boolean {
		return this.createdBy.id == user.id;
	}

	/**
	 * Get the amount of mappools in the tournament
	 */
	public mappoolCount(): number {
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
		this.mappools.forEach(mappoolIteration => {
			if (mappoolIteration.id == mappool.id) {
				mappoolIteration = Mappool.makeTrueCopy(mappool);
			}
		})
	}

	/**
	 * Get the image from the gamemode
	 */
	public getGamemodeImage(): string {
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

		for (const mappicker in json.mappickers) {
			newTournament.addMappicker(User.serializeJson(json.mappickers[mappicker]));
		}

		for (const mappool in json.mappools) {
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

		tournament.mappickers.forEach(mappicker => {
			newTournament.addMappicker(User.makeTrueCopy(mappicker));
		});

		tournament.mappools.forEach(mappool => {
			newTournament.addMappool(Mappool.makeTrueCopy(mappool));
		})

		newTournament.createdBy = User.makeTrueCopy(tournament.createdBy);

		return newTournament;
	}
}
