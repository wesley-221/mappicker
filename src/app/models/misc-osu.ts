export enum Gamemodes {
	Osu = 0,
	Taiko = 1,
	Catch = 2,
	Mania = 3
}

export const AllGamemodes: { id: Gamemodes, name: String }[] = [
	{ id: Gamemodes.Osu, name: "osu!" },
	{ id: Gamemodes.Taiko, name: "osu!taiko" },
	{ id: Gamemodes.Catch, name: "osu!catch" },
	{ id: Gamemodes.Mania, name: "osu!mania" }
];
