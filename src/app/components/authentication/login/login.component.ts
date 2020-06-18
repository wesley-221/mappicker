import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRequest } from '../../../models/user-request';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { TournamentService } from '../../../services/tournament.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	error: String = null;

	constructor(public authService: AuthenticationService, private route: Router, private tournamentService: TournamentService) {
		this.loginForm = new FormGroup({
			'username': new FormControl('', [
				Validators.required
			]),
			'password': new FormControl('', [
				Validators.required
			])
		});
	}

	ngOnInit() { }

	login() {
		const username = this.loginForm.get('username').value,
			password = this.loginForm.get('password').value;

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

	logout() {
		this.authService.logout();
		this.tournamentService.importTournaments();
	}
}
