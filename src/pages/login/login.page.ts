import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { AuthPage } from '../auth/auth.page';
import { SendResetPasswordPage } from '../reset-password/send-reset-password.page';

@Component({
	templateUrl: 'login.html',
})
export class LoginPage {
	constructor(public navCtrl: NavController, private _app: App) {}

	goHome() {
		this._app.getRootNav().setRoot(AuthPage);
	}

	goForgotPassword() {
		this.navCtrl.push(SendResetPasswordPage);
	}
}
