import { Gamemodes } from "./misc-osu";
import { User } from "./user";

export class Tournament {
	id: number;
	tournamentName: String;
	defaultGamemode: Gamemodes;
	mappickers: User[] = [];
	createdBy: User;

	/**
	 * Check if the given user is the creator of the tournament
	 * @param user the user to check
	 */
	public isCreator(user: User) {
		return this.createdBy.id == user.id;
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

		newTournament.createdBy = User.makeTrueCopy(tournament.createdBy);

		return newTournament;
	}
}
