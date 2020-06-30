import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from '../models/alert';

@Injectable({
	providedIn: 'root'
})

export class AlertService {
	private lastId: number = 0;
	private subject$ = new Subject<Alert>();

	/**
	 * Observable that receives all the alerts
	 */
	public onAlert(): Observable<Alert> {
		return this.subject$.asObservable();
	}

	/**
	 * Main alert method
	 * @param alert
	 */
	private alert(alert: Alert) {
		alert.id = this.lastId++;
		this.subject$.next(alert);
	}

	/**
	 * Send an info alert
	 * @param message the message
	 * @param options extra options
	 */
	public info(message: string, options?: Partial<Alert>) {
		this.alert(new Alert({ ...options, type: AlertType.Info, message }));
	}

	/**
	 * Send a success alert
	 * @param message the message
	 * @param options extra options
	 */
	public success(message: string, options?: Partial<Alert>) {
		this.alert(new Alert({ ...options, type: AlertType.Success, message }));
	}

	/**
	 * Send a warning alert
	 * @param message the message
	 * @param options extra options
	 */
	public warning(message: string, options?: Partial<Alert>) {
		this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
	}

	/**
	 * Send an error alert
	 * @param message the message
	 * @param options extra options
	 */
	public error(message: string, options?: Partial<Alert>) {
		this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
	}
}
