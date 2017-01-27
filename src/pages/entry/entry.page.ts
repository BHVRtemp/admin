import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { AuthPage } from '../auth/auth.page';
import { LoginPage } from '../login/login.page';
import { UserService } from '../../common';

@Component({
	template: '',
})
export class EntryPage {
	constructor(
		private app: App,
		private userService: UserService) {}

	ngOnInit() {

		this.userService.waitUntilReady(() => {
			if (this.userService.user) {
				// Redirect
				this.app.getRootNav().setRoot(AuthPage);
			} else {
				this.app.getRootNav().setRoot(LoginPage);
			}
		});
	}
}
