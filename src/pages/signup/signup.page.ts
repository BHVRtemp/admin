import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { GlobalValidator, UserService, Api } from '../../common';

@Component({
	templateUrl: 'signup.html',
})
export class SignupPage {
	
	username: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	password: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
	password2: FormControl = new FormControl('', [Validators.required]);
	firstName: FormControl = new FormControl('', [Validators.required]);
	lastName: FormControl = new FormControl('', [Validators.required]);
	defaultLanguage: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	error: string;

	form: FormGroup = this.formBuilder.group({
		username: this.username,
		email: this.email,
		firstName: this.firstName,
		lastName: this.lastName,
		password: this.password,
		password2: this.password2,
		defaultLanguage: this.defaultLanguage,
	}, { validator: GlobalValidator.areEqual('password', 'password2') });

	

	constructor(private userService: UserService, private api: Api, private formBuilder: FormBuilder, private navCtrl: NavController) {}

	submit() {
		this.submitted = true;
		this.error = null;
		if (!this.form.valid) return;

		return this.signup();

	}

	private signup() {
		this.form.value.token = this.navCtrl.getActive().getNavParams().data.token;
		const sub = this.api.post('/users', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				this.userService.loggedIn(res);
				logger.info(res);

			}, e => {
				this.error = e.json().message;
			});

		return sub;
	}

}
