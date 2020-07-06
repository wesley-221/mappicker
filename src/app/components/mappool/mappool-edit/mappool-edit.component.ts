import { Component, OnInit, Input } from '@angular/core';
import { Mappool } from '../../../models/mappool/mappool';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/tournament';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'app-mappool-edit',
	templateUrl: './mappool-edit.component.html',
	styleUrls: ['./mappool-edit.component.scss']
})
export class MappoolEditComponent implements OnInit {
	breadCrumbs: any = [['tournament overview', '/tournament-overview']];

	@Input() tournament: Tournament;
	@Input() mappool: Mappool;

	mappoolForm: FormGroup;

	modBracketIndex = 0;

	constructor(
		private route: ActivatedRoute,
		private tournamentService: TournamentService,
		private alertService: AlertService,
		private router: Router) {
		this.mappoolForm = new FormGroup({})

		this.route.params.subscribe(params => {
			const tournamentId = params.tournamentId;
			const mappoolId = params.mappoolId;

			this.tournamentService.finishedImporting().subscribe(res => {
				if (res === true) {
					this.tournament = Tournament.makeTrueCopy(this.tournamentService.getTournamentById(tournamentId));

					// Setup temporary variable to handle all the reactive form validation
					const temporaryMappool = this.tournament.getMappoolById(mappoolId);

					// Setup generic formcontrols
					this.mappoolForm.addControl('mappool-name', new FormControl(temporaryMappool.mappoolName, [
						Validators.required
					]));

					this.mappoolForm.addControl('mappool-match-condition', new FormControl(parseInt(temporaryMappool.bestOf), [
						Validators.required
					]));

					// Setup modbrackets
					temporaryMappool.modBrackets.forEach(modBracket => {
						modBracket.index = this.modBracketIndex++;

						// Add validators for modbracket fields
						this.mappoolForm.addControl(`mod-bracket-name-${modBracket.index}`, new FormControl(modBracket.modBracketName, Validators.required));
						this.mappoolForm.addControl(`mod-bracket-mods-${modBracket.index}`, new FormControl(modBracket.mods, Validators.required));
						this.mappoolForm.addControl(`mod-bracket-maps-required-${modBracket.index}`, new FormControl(modBracket.mapsRequired));
					});

					// All the validations have been setup
					this.mappool = Mappool.makeTrueCopy(temporaryMappool);

					// Setup the breadcrumb
					this.breadCrumbs = [];

					this.breadCrumbs.push(['tournament overview', '/tournament-overview']);
					this.breadCrumbs.push([this.tournament.tournamentName, `/tournament/${this.tournament.id}`]);
					this.breadCrumbs.push([this.mappool.mappoolName]);
				}
			});
		});
	}

	ngOnInit(): void { }

	updateMappool(): void {
		if (!this.mappoolForm.invalid) {
			this.mappool.mappoolName = this.mappoolForm.get('mappool-name').value;
			this.mappool.bestOf = this.mappoolForm.get('mappool-match-condition').value;

			this.tournament.updateMappool(this.mappool);

			this.tournamentService.updateTournament(this.tournament).subscribe(() => {
				this.tournamentService.importTournaments();
				this.alertService.success(`Successfully updated ${this.mappool.mappoolName}!`);

				this.router.navigate(['tournament', this.tournament.id]);
			});
		}
		else {
			this.mappoolForm.markAllAsTouched();
		}
	}
}
