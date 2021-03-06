import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { GlobalValidator, Api, User } from '../../common';

@Component({
	selector: 'user-dialog',
	templateUrl: 'user-dialog.html',
})
export class UserDialogComponent {
	user: User;
	
	username: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);
	defaultLanguage: FormControl = new FormControl('', [Validators.required]);
	roles: FormControl = new FormControl([]);


	submitted: Boolean = false;
	error: string;

	form: FormGroup;

	constructor(
		public dialogRef: MdDialogRef<UserDialogComponent>,
		public formBuilder: FormBuilder,
		public api: Api) {}
	
	getRoles(user) {
		let res = [];
		user.stations.map(station => {
			const roleId = station.role.id;
			const index = res.findIndex(r => r.roleId === roleId);
			if(index > -1) {
				res[index].stationsIds.push(station.id);
			} else {
				res.push({
					roleId,
					stationIds: [station.id],
				});
			}
		});
		return res;
	}

	ngOnInit() {
		// edit
		if (this.user) {
			this.username.setValue(this.user.username);
			this.email.setValue(this.user.email);
			this.firstName.setValue(this.user.firstName);
			this.lastName.setValue(this.user.lastName);
			this.defaultLanguage.setValue(this.user.defaultLanguage);
			this.roles.setValue(this.getRoles(this.user));

			this.form = this.formBuilder.group({
				username: this.username,
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName,
				defaultLanguage: this.defaultLanguage,
				roles: this.roles,
			});

		// create
		} else {
			this.form = this.formBuilder.group({
				email: this.email,
				roles: this.roles,
			});
		}
	}

	submit() {
		this.submitted = true;
		this.error = null;
		if (!this.form.valid) return;

		if (this.user) {
			return this.put();
		} else {
			return this.post();
		}

	}

	put() {
		this.form.value.id = this.user.id;
		console.log(this.form.value);
		const sub = this.api.put('/users', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				this.dialogRef.close(res.user);

			}, e => {
				logger.warn(e);
			});

		return sub;
	}

	post() {

		const sub = this.api.post('/users/invite', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				this.dialogRef.close(res.user);

			}, e => {
				logger.warn(e);
			});

		return sub;
	}
}
