import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModBracket } from '../../../../models/mappool/mod-bracket';
import { FormGroup } from '@angular/forms';
import { Mods } from '../../../../models/misc-osu';
import { isNumber } from 'util';

@Component({
	selector: 'app-mod-bracket',
	templateUrl: './mod-bracket.component.html',
	styleUrls: ['./mod-bracket.component.scss']
})
export class ModBracketComponent implements OnInit {
	@Input() modBracketForm: FormGroup;
	@Input() modBracket: ModBracket;
	@Output() deleteBracket = new EventEmitter<ModBracket>();
	@Input() modBracketColor: string = null;

	collapsed = false;
	allMods: string[] = [];

	constructor() {
		for (const mod in Mods) {
			if (!isNumber(Mods[mod])) {
				this.allMods.push(Mods[mod]);
			}
		}
	}

	ngOnInit(): void { }

	collapseModBracket(): void {
		this.collapsed = !this.collapsed;
	}

	deleteModBracket(): void {
		this.deleteBracket.emit(this.modBracket);
	}

	getModBracketNameValue(): string {
		return `mod-bracket-name-${this.modBracket.index}`;
	}

	getModBracketModsValue(): string {
		return `mod-bracket-mods-${this.modBracket.index}`;
	}

	getModBracketMapsRequiredValue(): string {
		return `mod-bracket-maps-required-${this.modBracket.index}`;
	}

	updateModBracket(): void {
		this.modBracket.modBracketName = this.modBracketForm.get(this.getModBracketNameValue()).value;
		this.modBracket.mods = this.modBracketForm.get(this.getModBracketModsValue()).value;
		this.modBracket.mapsRequired = this.modBracketForm.get(this.getModBracketMapsRequiredValue()).value !== '' ? this.modBracketForm.get(this.getModBracketMapsRequiredValue()).value : 1;
	}
}
