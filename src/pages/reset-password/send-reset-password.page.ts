import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login.page';

@Component({
	templateUrl: 'send-reset-password.html',
})
export class SendResetPasswordPage {
	constructor(public navCtrl: NavController) {}

	goLogin() {
		this.navCtrl.push(LoginPage, null, { animate: false });
	}
}
