import { Component, OnInit, Input } from '@angular/core';
import { Mappool } from '../../../../models/mappool/mappool';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModBracket } from '../../../../models/mappool/mod-bracket';
import { BestOf } from '../../../../models/misc-osu';

@Component({
	selector: 'app-mappool-creation-template',
	templateUrl: './mappool-creation-template.component.html',
	styleUrls: ['./mappool-creation-template.component.scss']
})
export class MappoolCreationTemplateComponent implements OnInit {
	@Input() mappool: Mappool;
	@Input() mappoolForm: FormGroup;

	modBracketIndex = 0;
	bestOf = BestOf;

	constructor() { }

	ngOnInit(): void {
		this.modBracketIndex = this.mappool.modBrackets.length + 1;
	}

	addNewModBracket() {
		const newModBracket = new ModBracket();
		newModBracket.index = this.modBracketIndex;

		this.modBracketIndex++;

		this.mappool.addModBracket(newModBracket);

		// Add validators for modbracket fields
		this.mappoolForm.addControl(`mod-bracket-name-${newModBracket.index}`, new FormControl('', [
			Validators.required
		]));

		this.mappoolForm.addControl(`mod-bracket-mods-${newModBracket.index}`, new FormControl('', [
			Validators.required
		]));

		this.mappoolForm.addControl(`mod-bracket-maps-required-${newModBracket.index}`, new FormControl('', [
		]));
	}

	deleteBracket(modBracket: ModBracket) {
		this.mappool.removeModBracket(modBracket);

		// Remove validators for modbracket fields
		this.mappoolForm.removeControl(`mod-bracket-name-${modBracket.index}`);
		this.mappoolForm.removeControl(`mod-bracket-mods-${modBracket.index}`);
		this.mappoolForm.removeControl(`mod-bracket-maps-required-${modBracket.index}`);
	}
}
