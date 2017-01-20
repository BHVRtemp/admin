import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'login-component',
	templateUrl: 'login.html',
})
export class LoginComponent {
	@Output() onSuccess = new EventEmitter();

	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	password: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

	submitted: Boolean = false;
	error: Boolean = false;

	form: FormGroup = this.formBuilder.group({
		email: this.email,
		password: this.password,
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public userService: UserService) {}

	// Attempt to login in through our User service
	login() {
		const sub = this.api.post('/login', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				this.userService.loggedIn(res);
				this.onSuccess.emit();

			}, e => {
				this.error = true;
				logger.warn(e);
			});

		return sub;

	}


	submit() {
		this.submitted = true;
		this.error = false;
		if (!this.form.valid) return;

		return this.login();
	}
}
