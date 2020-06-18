import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllGamemodes } from '../../../models/misc-osu';
import { Tournament } from '../../../models/tournament';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-tournament-interface',
	templateUrl: './tournament-interface.component.html',
	styleUrls: ['./tournament-interface.component.scss']
})
export class TournamentInterfaceComponent implements OnInit {
	@Input() tournamentForm: FormGroup;
	@Input() tournament: Tournament;

	allGamemodes = AllGamemodes;

	constructor(private userService: UserService) {
	}

	ngOnInit(): void { }
}
