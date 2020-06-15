import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './components/main/body/body.component';
import { ErrorComponent } from './components/main/error/error.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

const routes: Routes = [
	{
		path: '', component: BodyComponent, children: [
			{ path: '', component: ErrorComponent },

			{ path: 'profile', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },

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
