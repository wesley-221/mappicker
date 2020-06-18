export class User {
	id: number;
	slug: string;
	username: string;
	admin: boolean;
	tournamentHost: boolean;
	token: string;
	password: string;
	passwordConfirm: string;
	uploadSecretKey: string;
	uploadSecret: string;

	/**
	 * Make a true copy of the user
	 */
	public static makeTrueCopy(user: User): User {
		const newUser = new User();

		newUser.id = user.id;
		newUser.slug = user.slug;
		newUser.username = user.username;
		newUser.admin = user.admin;
		newUser.tournamentHost = user.tournamentHost;
		newUser.token = user.token;

		return newUser;
	}

	/**
	 * Serialize the json to a tournament object
	 * @param json
	 */
	public static serializeJson(json: any): User {
		const newUser = new User();

		newUser.id = json.id;
		newUser.slug = json.slug;
		newUser.username = json.username;
		newUser.admin = json.admin;
		newUser.tournamentHost = json.tournamentHost;
		newUser.token = json.token;
		newUser.password = json.password;
		newUser.passwordConfirm = json.passwordConfirm;
		newUser.uploadSecretKey = json.uploadSecretKey;
		newUser.uploadSecret = json.uploadSecret;

		return newUser;
	}
}
