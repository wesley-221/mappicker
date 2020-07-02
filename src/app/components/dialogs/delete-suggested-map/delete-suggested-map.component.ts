import { Component, OnInit, Inject } from '@angular/core';
import { DeleteSuggestedMapDialog } from '../../suggested-maps/suggested-maps-list/suggested-maps-list.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-delete-suggested-map',
	templateUrl: './delete-suggested-map.component.html',
	styleUrls: ['./delete-suggested-map.component.scss']
})
export class DeleteSuggestedMapComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteSuggestedMapDialog) { }
	ngOnInit(): void { }
}
