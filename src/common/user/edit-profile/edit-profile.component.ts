import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from 'ng2-translate';

import { UserService } from '../user.service';
import { Api } from '../../api/api';

@Component({
	selector: 'edit-profile',
	templateUrl: 'edit-profile.html',
})
export class EditProfileComponent {

	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);
	defaultLanguage: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	success: Boolean;
	error: string;

	form: FormGroup = this.formBuilder.group({
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

		this.userService.waitUntilReady(() => {
			if (this.userService.user) {
				this.firstName.setValue(this.userService.user.firstName);
				this.lastName.setValue(this.userService.user.lastName);
				this.defaultLanguage.setValue(this.userService.user.defaultLanguage);
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
