import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from 'ng2-translate';

import { UserService } from '../user.service';
import { Api } from '../../api/api';
import { GlobalValidator } from '../../form/global-validator';

@Component({
	selector: 'edit-profile',
	templateUrl: 'edit-profile.html',
})
export class EditProfileComponent {

	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	username: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);
	defaultLanguage: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	success: Boolean;
	error: string;

	form: FormGroup = this.formBuilder.group({
		username: this.username,
		email: this.email,
		firstName: this.firstName,
		lastName: this.lastName,
		defaultLanguage: this.defaultLanguage,
	});

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public userService: UserService,
		private translateService: TranslateService) {}

	ngOnInit() {
		// hack bugfix
		this.firstName.setValue(' ');
		this.lastName.setValue(' ');
		this.email.setValue('a@a');
		this.username.setValue(' ');

		this.userService.waitUntilReady(() => {
			if (this.userService.user) {
				this.firstName.setValue(this.userService.user.firstName);
				this.lastName.setValue(this.userService.user.lastName);
				this.defaultLanguage.setValue(this.userService.user.defaultLanguage);
				this.username.setValue(this.userService.user.username);
				this.email.setValue(this.userService.user.email);
			}
		});
	}

	editProfile() {
		const sub = this.api.put('/profile', this.form.value);

		this.translateService.use(this.form.value.defaultLanguage);
		
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
