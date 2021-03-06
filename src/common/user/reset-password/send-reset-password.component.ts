import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'send-reset-password',
	templateUrl: 'send-reset-password.html',
})
export class SendResetPasswordComponent {

	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);

	submitted: Boolean = false;
	error: string;
	success: Boolean;

	form: FormGroup = this.formBuilder.group({
		email: this.email,
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api) {}

	// Attempt to login in through our User service
	sendResetPassword() {
		const sub = this.api.post('/send-reset-password', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(resp => {
				this.success = true;

			}, err => {
				this.error = err.json().message;
				logger.error(err);
			});

		return sub;

	}


	submit() {
		this.submitted = true;
		this.success = null;
		this.error = null;
		
		if (!this.form.valid) return;

		return this.sendResetPassword();
	}
}
