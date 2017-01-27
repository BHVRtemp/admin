import { Component } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';

import { AuthPage } from '../auth/auth.page';
import { SendResetPasswordPage } from '../reset-password/send-reset-password.page';

@Component({
	templateUrl: 'login.html',
})
export class LoginPage {
	invalidToken: boolean = false;
	errorMessage: String;
	constructor(public navCtrl: NavController, private _app: App, public params: NavParams) {
		if (typeof params !== 'undefined') {
			this.errorMessage = params.get('message');
			this.invalidToken = true;
		}

	}

	goHome() {
		this._app.getRootNav().setRoot(AuthPage);
	}

	goForgotPassword() {
		this.navCtrl.push(SendResetPasswordPage, null, { animate: false });
	}
}
