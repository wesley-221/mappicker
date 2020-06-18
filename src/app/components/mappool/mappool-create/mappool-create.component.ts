import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllGamemodes } from '../../../models/misc-osu';

@Component({
	selector: 'app-mappool-create',
	templateUrl: './mappool-create.component.html',
	styleUrls: ['./mappool-create.component.scss']
})
export class MappoolCreateComponent implements OnInit {
	allGamemodes = AllGamemodes;

	mappoolForm: FormGroup;

	constructor() {
		this.mappoolForm = new FormGroup({
			'mappool-name': new FormControl('', [
				Validators.required
			]),
			'mappool-gamemode': new FormControl('', [
				Validators.required
			])
		});
	}

	ngOnInit(): void { }
}
