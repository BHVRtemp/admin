import { Component , Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Api } from '../../api/api';
import { UserService } from '../user.service';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'reset-password',
	template: 'reset-password.html',
})
export class ResetPasswordComponent {
	@Output() onSuccess = new EventEmitter();

	newPassword1: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	newPassword2: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	error: string;

	form: FormGroup = this.formBuilder.group({
		newPassword1: this.newPassword1,
		newPassword2: this.newPassword2,
	}, { validator: GlobalValidator.areEqual('newPassword1', 'newPassword2') });

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public userService: UserService,
		public navCtrl: NavController) {}

	resetPassword() {
		
		this.api.post('/reset-password', {
			password: this.form.value.newPassword1,
			token: this.navCtrl.getActive().getNavParams().data.token,
		})
			.map(resp => resp.json())
			.subscribe(resp => {
				this.userService.loggedIn(resp);
				this.onSuccess.emit();

			}, e => {
				this.error = 'RESET_PASSWORD_FAILED';
			});
	}

	submit() {

		this.submitted = true;
		if (!this.form.valid) return;

		return this.resetPassword();
	}
}
