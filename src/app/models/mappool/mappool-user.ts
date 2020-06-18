export class MappoolUser {
	id: number;
	username: string;
	slug: string;

	/**
	 * Map the json to a user object
	 * @param json
	 */
	public static mapFromJson(json: any): MappoolUser {
		const newUser = new MappoolUser();

		newUser.id = json.id;
		newUser.username = json.username;
		newUser.slug = json.slug;

		return newUser;
	}

	/**
	 * Convert the user to a json format
	 * @param user the user
	 */
	public convertToJson(user: MappoolUser) {
		return {
			id: user.id,
			username: user.username,
			slug: user.slug
		};
	}

	/**
	 * Make a true copy of the given user
	 * @param user the user
	 */
	public static makeTrueCopy(user: MappoolUser) {
		const newUser = new MappoolUser();

		newUser.id = user.id;
		newUser.username = user.username;
		newUser.slug = user.slug;

		return newUser;
	}
}
