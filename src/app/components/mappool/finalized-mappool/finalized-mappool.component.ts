import { Component, OnInit, Input } from '@angular/core';
import { Mappool } from '../../../models/mappool/mappool';
import { Tournament } from '../../../models/tournament';
import { ModBracket } from 'app/models/mappool/mod-bracket';
import { SuggestedMap } from 'app/models/mappool/suggested-map';
import { ModBracketMap } from 'app/models/mappool/mod-bracket-map';
import { ElectronService } from 'app/services/electron.service';

@Component({
	selector: 'app-finalized-mappool',
	templateUrl: './finalized-mappool.component.html',
	styleUrls: ['./finalized-mappool.component.scss']
})
export class FinalizedMappoolComponent implements OnInit {
	@Input() tournament: Tournament;
	@Input() mappool: Mappool;

	pickForModBracket: ModBracket;
	pickForModBracketMapIndex: number;

	constructor(public electronService: ElectronService) { }
	ngOnInit(): void { }

	/**
	 * Set the modbracket and index
	 * @param modBracket
	 * @param modBracketMapIndex
	 */
	findMapForModBracket(modBracket: ModBracket, modBracketMapIndex: number): void {
		this.pickForModBracket = modBracket;
		this.pickForModBracketMapIndex = modBracketMapIndex;
	}

	/**
	 * Clear the modbracket and index
	 */
	clearModBracket(): void {
		this.pickForModBracket = null;
		this.pickForModBracketMapIndex = null;
	}

	/**
	 * Add a new map to the given modbracket
	 * @param modBracket
	 */
	addNewMap(modBracket: ModBracket): void {
		const newModBracketMap: ModBracketMap = new ModBracketMap();
		newModBracketMap.index = modBracket.indexCount++;

		modBracket.allMaps.push(newModBracketMap);
	}

	/**
	 * Remove the latest map from the modbracket
	 * @param modBracket
	 */
	removeMap(modBracket: ModBracket): void {
		modBracket.allMaps.splice(modBracket.allMaps.length - 1, 1);
		modBracket.indexCount--;
	}

	/**
	 * Set the map for the selected modbracket
	 * @param suggestedMap
	 */
	pickSuggestedMap(suggestedMap: SuggestedMap): void {
		for (const modBracketMap in this.pickForModBracket.allMaps) {
			if (this.pickForModBracket.allMaps[modBracketMap].index == this.pickForModBracketMapIndex) {
				this.pickForModBracket.allMaps[modBracketMap].map = SuggestedMap.makeTrueCopy(suggestedMap);
			}
		}

		this.clearModBracket();
	}
}
