import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api, GlobalValidator } from '../../common';

@Component({
	selector: 'signup-component',
	templateUrl: 'signup.html',
})
export class SignupComponent {
	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);
	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	password: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	password2: FormControl = new FormControl('', []);

	submitted: Boolean = false;
	success: Boolean;
	error: string;

	// TODO delete this
	token: string;

	form: FormGroup = this.formBuilder.group({
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		password: this.password,
		password2: this.password2,
	}, { validator: GlobalValidator.areEqual('password', 'password2') });

	constructor(
		private formBuilder: FormBuilder,
		public api: Api) { }
	
	signup() {
		const sub = this.api.post('/user', this.form.value);

		sub
		.map(resp => resp.json()).subscribe(resp => {
			this.success = true;
			// TODO delete this
			this.token = window.location.protocol + '//' + window.location.hostname + '/#/user/activate/' + resp.token;
			logger.info('success', resp);

		}, e => {
			let errorMessage = 'UNKNOWN_ERROR';
			try {
				const err = e.json();
				if (err && err.message) {
					this.error = err.message;
				}
				
			} catch (e) {
				logger.warn('error', e);
			}

		});

		return sub;
	}

	submit() {
		this.submitted = true;
		this.success = null;
		this.error = null;
		if (!this.form.valid) return;

		return this.signup();
	}
	
}
