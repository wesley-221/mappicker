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
}
