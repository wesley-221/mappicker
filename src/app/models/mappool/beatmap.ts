import { Beatmapset } from "./beatmapset";

export class Beatmap {
	difficulty_rating: number;
	id: number;
	mode: string;
	version: string;
	accuracy: number;
	ar: number;
	beatmapset_id: number;
	bpm: number;
	convert: boolean;
	count_circles: number;
	count_sliders: number;
	count_spinners: number;
	count_total: number;
	cs: number;
	deleted_at: any;
	drain: number;
	hit_length: number;
	is_scoreable: boolean;
	last_updated: Date;
	mode_int: number;
	passcount: number;
	playcount: number;
	ranked: number;
	status: string;
	total_length: number;
	url: string;
	beatmapset: Beatmapset;
	failtimes: { fail: number[], exit: number[] };
	max_combo: number;

	/**
	 * Get the full name of the beatmap
	 * @returns Artist - Song title [Difficulty] (Mapper)
	 */
	public getFullBeatmapName() {
		return `${this.beatmapset.artist} - ${this.beatmapset.title} [${this.version}] (${this.beatmapset.creator})`;
	}

	/**
	 * Serialize the json to a beatmapset object
	 * @param json
	 */
	public static serializeJson(json: any): Beatmap {
		const newBeatmap = new Beatmap();

		newBeatmap.difficulty_rating = json.difficulty_rating;
		newBeatmap.id = json.id;
		newBeatmap.mode = json.mode;
		newBeatmap.version = json.version;
		newBeatmap.accuracy = json.accuracy;
		newBeatmap.ar = json.ar;
		newBeatmap.beatmapset_id = json.beatmapset_id;
		newBeatmap.bpm = json.bpm;
		newBeatmap.convert = json.convert;
		newBeatmap.count_circles = json.count_circles;
		newBeatmap.count_sliders = json.count_sliders;
		newBeatmap.count_spinners = json.count_spinners;
		newBeatmap.count_total = json.count_total;
		newBeatmap.cs = json.cs;
		newBeatmap.deleted_at = json.deleted_at;
		newBeatmap.drain = json.drain;
		newBeatmap.hit_length = json.hit_length;
		newBeatmap.is_scoreable = json.is_scoreable;
		newBeatmap.last_updated = json.last_updated;
		newBeatmap.mode_int = json.mode_int;
		newBeatmap.passcount = json.passcount;
		newBeatmap.playcount = json.playcount;
		newBeatmap.ranked = json.ranked;
		newBeatmap.status = json.status;
		newBeatmap.total_length = json.total_length;
		newBeatmap.url = json.url;
		newBeatmap.beatmapset = Beatmapset.serializeJson(json.beatmapset);
		newBeatmap.failtimes = json.failtimes;
		newBeatmap.max_combo = json.max_combo;

		return newBeatmap;
	}
}
