import { Component, Output, Input, EventEmitter } from '@angular/core';
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
	@Input('maximum-level') maximumLevel: number;
	@Input('type') type: "email"|"username" = "email";

	username: FormControl = new FormControl('', [Validators.required]);
	email: FormControl = new FormControl('', [Validators.required, GlobalValidator.isEmail]);
	password: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

	submitted: Boolean = false;
	error: string;

	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		public api: Api,
		public userService: UserService) {}

	ngOnInit() {
		if(this.type == "username") {
			this.form = this.formBuilder.group({
				username: this.username,
				password: this.password,
			});
		} else {
			this.form = this.formBuilder.group({
				email: this.email,
				password: this.password,
			});
		}
	}

	// Attempt to login in through our User service
	login() {
		const sub = this.api.post('/login', this.form.value);
		
		sub.map(res => res.json())
			.subscribe(res => {
				if (this.maximumLevel && res.user.role.level > this.maximumLevel) {
					this.error = 'ROLE_TOO_LOW';
					return;
				}
				
				this.userService.loggedIn(res);
				this.onSuccess.emit();

			}, e => {
				this.error = 'BAD_CREDENTIALS';
				logger.warn(e);
			});

		return sub;

	}


	submit() {
		this.submitted = true;
		this.error = null;
		if (!this.form.valid) return;

		return this.login();
	}
}
