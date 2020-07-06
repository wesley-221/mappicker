import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AdministratorGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthenticationService) { }

	canActivate(): boolean {
		if (this.authService.isLoggedIn && this.authService.isAdmin()) {
			return true;
		}

		this.router.navigate(['/']);
		return false;
	}
}
