export enum AlertType {
	Success,
	Error,
	Info,
	Warning
}

export class Alert {
	id: number;
	type: AlertType;
	message: string;
	duration: number = 3000;

	constructor(init?: Partial<Alert>) {
		Object.assign(this, init);
	}
}
