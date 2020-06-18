import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	constructor(private authService: AuthenticationService) {
		this.authService.validateToken(authService.authToken).subscribe((response: any) => {
			if(response.valid) {
				const loggedInUser: User = User.serializeJson(response.user);

				this.authService.user = loggedInUser;
				this.authService.isLoggedIn = true;
			}
			else {
				this.authService.logout();
			}
		});
	}
}
