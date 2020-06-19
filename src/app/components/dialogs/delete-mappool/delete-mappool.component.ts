import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MappoolDeleteDialogData } from '../../mappool/mappool/mappool.component';

@Component({
	selector: 'app-delete-mappool',
	templateUrl: './delete-mappool.component.html',
	styleUrls: ['./delete-mappool.component.scss']
})
export class DeleteMappoolComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: MappoolDeleteDialogData) { }
}
