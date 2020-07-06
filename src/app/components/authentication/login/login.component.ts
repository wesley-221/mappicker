import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRequest } from '../../../models/authentication/user-request';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../models/authentication/user';
import { HttpErrorResponse } from '@angular/common/http';
import { TournamentService } from '../../../services/tournament.service';
import { OsuService } from '../../../services/osu.service';
import { EndpointMe } from '../../../models/osu-api/endpoint-me';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	error: string = null;

	isAuthenticating = false;

	constructor(public authService: AuthenticationService, private route: Router, private tournamentService: TournamentService, public osuService: OsuService) {
		this.loginForm = new FormGroup({
			'username': new FormControl('', [
				Validators.required
			]),
			'password': new FormControl('', [
				Validators.required
			])
		});
	}

	ngOnInit(): void { }

	login(): void {
		const username = this.loginForm.get('username').value;
		const password = this.loginForm.get('password').value;

		const userRequest = new UserRequest();

		userRequest.username = username;
		userRequest.password = password;

		this.authService.login(userRequest).subscribe(data => {
			this.error = null;

			const loggedInUser: User = new User();

			loggedInUser.id = data.body.userId;
			loggedInUser.username = data.body.username;
			loggedInUser.admin = data.body.admin;
			loggedInUser.token = data.headers.get('Authorization');

			this.authService.user = loggedInUser;
			this.authService.isLoggedIn = true;
			this.authService.authToken = data.headers.get('Authorization');

			this.authService.cacheAuthenticationToken(loggedInUser.token);

			this.tournamentService.importTournaments();
		}, (err: HttpErrorResponse) => {
			this.error = err.error.message;
		});
	}

	logout(): void {
		this.authService.logout();
		this.tournamentService.importTournaments();
	}

	osuLogin(): void {
		this.isAuthenticating = true;

		this.osuService.startOsuOauthProcess().subscribe(token => {
			if (token != null) {
				this.osuService.cacheOsuOauthToken(token);

				this.osuService.getMeData().subscribe(me => {
					const osuUser: EndpointMe = EndpointMe.serializeJson(me);

					this.osuService.authenticatedUser = osuUser;
					this.osuService.cacheAuthenticatedUser(osuUser);

					this.isAuthenticating = false;
				});
			}
			else {
				this.isAuthenticating = false;
			}
		});
	}

	osuLogout(): void {
		this.osuService.logout();
	}
}
