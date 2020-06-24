export class EndpointMe {
	id: number;
	username: string;
	avatar_url: string;
	country_code: string;
	cover_url: string;

	/**
	 * Serialize the json to a me object
	 * @param json
	 */
	public static serializeJson(json: any): EndpointMe {
		const newMe = new EndpointMe();

		newMe.id = json.id;
		newMe.username = json.username;
		newMe.avatar_url = json.avatar_url;
		newMe.country_code = json.country_code;
		newMe.cover_url = json.cover_url;

		return newMe;
	}

	/**
	 * Convert the object to a json object
	 * @param me
	 */
	public static convertToJson(me: EndpointMe): any {
		return {
			id: me.id,
			username: me.username,
			avatar_url: me.avatar_url,
			country_code: me.country_code,
			cover_url: me.cover_url
		};
	}
}
