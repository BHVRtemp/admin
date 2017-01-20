import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'change-password',
	templateUrl: 'change-password.html',
})
export class ChangePasswordComponent {
	oldPassword: FormControl = new FormControl('', [Validators.required]);
	newPassword1: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	newPassword2: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	success: Boolean;
	error: string;

	form: FormGroup = this.formBuilder.group({
		oldPassword: this.oldPassword,
		newPassword1: this.newPassword1,
		newPassword2: this.newPassword2,
	}, { validator: GlobalValidator.areEqual('newPassword1', 'newPassword2') });

	constructor(
		private formBuilder: FormBuilder,
		public api: Api) {}

	changePassword() {

		const { oldPassword, newPassword1 } = this.form.value;
		
		this.api.post('/change-password', { oldpassword: oldPassword, newpassword: newPassword1 })
			.subscribe(resp => {
				this.success = true;

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
	}

	submit() {
		this.submitted = true;
		this.success = null;
		this.error = null;
		if (!this.form.valid) return;

		return this.changePassword();
	}
}
