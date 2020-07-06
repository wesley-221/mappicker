import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { Alert, AlertType } from '../../../models/alert';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	alertTypes: any;
	alerts: Alert[] = [];

	constructor(private alertService: AlertService) {
		this.alertTypes = AlertType;
	}

	ngOnInit(): void {
		this.alertService.onAlert().subscribe((alert: Alert) => {
			this.alerts.push(alert);
			setTimeout(() => this.removeAlert(alert), (alert.duration * 1000));
		});
	}

	/**
	 * Removes the alert from the array
	 * @param alert
	 */
	removeAlert(alert: Alert): void {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}
}
