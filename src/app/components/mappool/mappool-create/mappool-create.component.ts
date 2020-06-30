import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../../../models/tournament';
import { TournamentService } from '../../../services/tournament.service';
import { BestOf } from '../../../models/misc-osu';
import { Mappool } from '../../../models/mappool/mappool';
import { ModBracket } from '../../../models/mappool/mod-bracket';

@Component({
	selector: 'app-mappool-create',
	templateUrl: './mappool-create.component.html',
	styleUrls: ['./mappool-create.component.scss']
})
export class MappoolCreateComponent implements OnInit {
	tournament: Tournament;
	mappool: Mappool = new Mappool();
	mappoolForm: FormGroup;
	bestOf = BestOf;

	modBracketIndex = 0;

	breadCrumbs: any = [['tournament overview', '/tournament-overview']];

	constructor(private route: Router, private router: ActivatedRoute, private tournamentService: TournamentService) {
		this.router.params.subscribe(param => {
			this.tournamentService.finishedImporting().subscribe(res => {
				if (res == true) {
					const thisTournament = this.tournamentService.getTournamentById(param.id);
					this.tournament = Tournament.makeTrueCopy(thisTournament);

					this.breadCrumbs.push([this.tournament.tournamentName, `/tournament/${this.tournament.id}`]);
					this.breadCrumbs.push(['mappool creation'])
				}
			});
		});

		this.mappoolForm = new FormGroup({
			'mappool-name': new FormControl('', [
				Validators.required
			]),
			'mappool-match-condition': new FormControl('', [
				Validators.required
			])
		});
	}

	ngOnInit(): void { }

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

	createMappool() {
		if (!this.mappoolForm.invalid) {
			this.mappool.mappoolName = this.mappoolForm.get('mappool-name').value;
			this.mappool.bestOf = this.mappoolForm.get('mappool-match-condition').value;

			this.tournament.addMappool(this.mappool);

			this.tournamentService.createTournament(this.tournament).subscribe(response => {
				this.tournament = Tournament.serializeJson(response);
				this.tournamentService.importTournaments();

				this.route.navigate(['tournament', this.tournament.id]);
			});
		}
		else {
			this.mappoolForm.markAllAsTouched();
		}
	}
}
