import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './components/main/body/body.component';
import { ErrorComponent } from './components/main/error/error.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { MappoolCreateComponent } from './components/mappool/mappool-create/mappool-create.component';
import { TournamentOverviewComponent } from './components/tournament/tournament-overview/tournament-overview.component';
import { TournamentCreationComponent } from './components/tournament/tournament-creation/tournament-creation.component';
import { TournamentViewComponent } from './components/tournament/tournament-view/tournament-view.component';
import { LoggedInGuard } from './guards/logged-in-guard';
import { environment } from '../environments/environment';

const loginGuardsForProd = environment.production == true ? [ LoggedInGuard ] : [];

const routes: Routes = [
	{
		path: '', component: BodyComponent, children: [
			{ path: '', component: LoginComponent },

			{ path: 'profile', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },

			{ path: 'tournament-overview', component: TournamentOverviewComponent, canActivate: [ ...loginGuardsForProd ] },
			{ path: 'tournament-create', component: TournamentCreationComponent, canActivate: [ ...loginGuardsForProd ] },
			{ path: 'tournament/:id', component: TournamentViewComponent, canActivate: [ ...loginGuardsForProd ] },

			{ path: 'mappool-create', component: MappoolCreateComponent },

			{ path: '..', component: ErrorComponent }
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
