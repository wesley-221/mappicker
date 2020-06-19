import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../models/tournament';

@Component({
	selector: 'app-mappool-overview',
	templateUrl: './mappool-overview.component.html',
	styleUrls: ['./mappool-overview.component.scss']
})
export class MappoolOverviewComponent implements OnInit {
	@Input() tournament: Tournament;

	constructor() { }
	ngOnInit(): void { }
}
