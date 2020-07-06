import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRequest } from '../../../models/authentication/user-request';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	registerErrors: string[] = [];

	constructor(private authService: AuthenticationService) {
		this.registerForm = new FormGroup({
			'username': new FormControl('', [
				Validators.required
			]),
			'password': new FormControl('', [
				Validators.required
			]),
			'password-confirmation': new FormControl('', [
				Validators.required
			])
		});

		this.registerForm.setValidators(this.isEqualTo('password', 'password-confirmation'));
	}

	ngOnInit(): void { }

	/**
	 * Register a new user
	 */
	public register(): void {
		const username = this.registerForm.get('username');
		const password = this.registerForm.get('password');
		const passwordConfirm = this.registerForm.get('password-confirmation');

		const errors: string[] = [];

		if(username.invalid) {
			errors.push('You have to fill in a username in order to register.');
		}

		if(password.invalid) {
			if(password.errors.required) {
				errors.push('You have to enter a password in order to register.');
			}
		}

		if(passwordConfirm.invalid) {
			if(passwordConfirm.errors.required) {
				errors.push('You have to enter the password confirmation in order to register.');
			}

			if(passwordConfirm.errors.notEquivalent) {
				errors.push('The passwords you have entered do not match.');
			}
		}

		if(errors.length > 0) {
			this.registerErrors = errors;
		}
		else {
			this.registerErrors = null;

			const registerUser = new UserRequest();

			registerUser.username = username.value;
			registerUser.password = password.value;
			registerUser.passwordConfirm = passwordConfirm.value;

			this.authService.register(registerUser).subscribe(() => {
				this.registerErrors = [];


			}, (err: HttpErrorResponse) => {
				this.registerErrors = [];

				this.registerErrors.push(err.error.message);
			});
		}
	}

	/**
	 * Compare two fields with eachother
	 * @param val1
	 * @param val2
	 */
	private isEqualTo(val1: any, val2: any): ValidatorFn {
		return (checkForm: FormGroup): any => {
			const v1 = checkForm.controls[val1];
			const v2 = checkForm.controls[val2];

			return v1.value == v2.value ? v2.setErrors(null) : v2.setErrors({ notEquivalent: true });
		}
	}
}
