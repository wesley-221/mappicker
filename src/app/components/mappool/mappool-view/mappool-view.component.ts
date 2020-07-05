import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/tournament';
import { Mappool } from '../../../models/mappool/mappool';

@Component({
	selector: 'app-mappool-view',
	templateUrl: './mappool-view.component.html',
	styleUrls: ['./mappool-view.component.scss']
})
export class MappoolViewComponent implements OnInit {
	breadCrumbs: any = [];

	tournament: Tournament;
	mappool: Mappool;

	constructor(private route: ActivatedRoute, private tournamentService: TournamentService) {
		this.route.params.subscribe(params => {
			const tournamentId = params.tournamentId,
				mappoolId = params.mappoolId;

			this.tournamentService.finishedImporting().subscribe(res => {
				if (res == true) {
					this.tournament = Tournament.makeTrueCopy(this.tournamentService.getTournamentById(tournamentId));
					this.mappool = Mappool.makeTrueCopy(this.tournament.getMappoolById(mappoolId));

					this.breadCrumbs = [];

					this.breadCrumbs.push(['tournament overview', '/tournament-overview']);
					this.breadCrumbs.push([this.tournament.tournamentName, `/tournament/${this.tournament.id}`]);
					this.breadCrumbs.push([this.mappool.mappoolName])
				}
			});
		});
	}

	ngOnInit(): void { }
}
