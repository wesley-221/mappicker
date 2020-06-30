export class Beatmapset {
	artist: string;
	creator: string;
	favourite_count: number;
	id: number;
	play_count: number;
	preview_url: string;
	source: string;
	status: string;
	title: string;
	user_id: number;
	video: boolean;
	availability: { download_disabled: boolean, more_information: string };
	bpm: number;
	can_be_hyped: boolean;
	discussion_enabled: boolean;
	discussion_locked: boolean;
	hype: { current: number, required: number };
	is_scoreable: boolean;
	last_updated: Date;
	legacy_thread_url: string;
	nominations: { current: number, required: number };
	ranked: number;
	ranked_date: Date;
	storyboard: boolean;
	submitted_date: Date;
	tags: string;
	ratings: number[];

	/**
	 * Get the link of the beatmap cover image
	 */
	public getBeatmapsetCover() {
		return `https://assets.ppy.sh/beatmaps/${this.id}/covers/cover.jpg`;
	}

	/**
	 * Serialize the json to a beatmapset object
	 * @param json
	 */
	public static serializeJson(json: any): Beatmapset {
		const newBeatmapset = new Beatmapset();

		newBeatmapset.artist = json.artist;
		newBeatmapset.creator = json.creator;
		newBeatmapset.favourite_count = json.favourite_count;
		newBeatmapset.id = json.id;
		newBeatmapset.play_count = json.play_count;
		newBeatmapset.preview_url = json.preview_url;
		newBeatmapset.source = json.source;
		newBeatmapset.status = json.status;
		newBeatmapset.title = json.title;
		newBeatmapset.user_id = json.user_id;
		newBeatmapset.video = json.video;
		newBeatmapset.availability = json.availability;
		newBeatmapset.bpm = json.bpm;
		newBeatmapset.can_be_hyped = json.can_be_hyped;
		newBeatmapset.discussion_enabled = json.discussion_enabled;
		newBeatmapset.discussion_locked = json.discussion_locked;
		newBeatmapset.hype = json.hype;
		newBeatmapset.is_scoreable = json.is_scoreable;
		newBeatmapset.last_updated = json.last_updated;
		newBeatmapset.legacy_thread_url = json.legacy_thread_url;
		newBeatmapset.nominations = json.nominations;
		newBeatmapset.ranked = json.ranked;
		newBeatmapset.ranked_date = json.ranked_date;
		newBeatmapset.storyboard = json.storyboard;
		newBeatmapset.submitted_date = json.submitted_date;
		newBeatmapset.tags = json.tags;
		newBeatmapset.ratings = json.ratings;

		return newBeatmapset;
	}
}
