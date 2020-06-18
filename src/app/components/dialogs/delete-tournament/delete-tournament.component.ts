import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TournamentDeleteDialogData } from '../../tournament/tournament/tournament.component';

@Component({
	selector: 'app-delete-tournament',
	templateUrl: './delete-tournament.component.html',
	styleUrls: ['./delete-tournament.component.scss']
})

export class DeleteTournamentComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: TournamentDeleteDialogData) { }
}
