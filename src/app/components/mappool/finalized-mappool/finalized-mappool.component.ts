import { Component, OnInit, Input } from '@angular/core';
import { Mappool } from '../../../models/mappool/mappool';
import { Tournament } from '../../../models/tournament';

@Component({
	selector: 'app-finalized-mappool',
	templateUrl: './finalized-mappool.component.html',
	styleUrls: ['./finalized-mappool.component.scss']
})
export class FinalizedMappoolComponent implements OnInit {
	@Input() tournament: Tournament;
	@Input() mappool: Mappool;

	constructor() { }
	ngOnInit(): void { }
}
