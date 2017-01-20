import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { Api } from '../../api/api';

@Component({
	selector: 'edit-profile',
	templateUrl: 'edit-profile.html',
})
export class EditProfileComponent {

	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	success: Boolean;
	error: string;

	form: FormGroup = this.formBuilder.group({
		firstName: this.firstName,
		lastName: this.lastName,
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public userService: UserService) {

			if (userService.user) {
				this.firstName.setValue(userService.user.firstName);
				this.lastName.setValue(userService.user.lastName);
			}
		}

	editProfile() {
		const sub = this.api.put('/user', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				this.success = true;
				this.userService.user = res.user;

			}, err => {
				this.error = 'UNKNOWN_ERROR';
			});

		return sub;
	}


	submit() {
		this.submitted = true;
		this.success = null;
		this.error = null;
		if (!this.form.valid) return;

		return this.editProfile();
	}
}
