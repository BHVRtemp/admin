import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs.page';
import { SignupPage } from '../signup/signup.page';
import { SendResetPasswordPage } from '../reset-password/send-reset-password.page';

@Component({
	templateUrl: 'login.html',
})
export class LoginPage {
	constructor(public navCtrl: NavController) {}

	goHome() {
		this.navCtrl.setRoot(TabsPage);
	}

	goForgotPassword() {
		this.navCtrl.push(SendResetPasswordPage);
	}

	goSignUp() {
		this.navCtrl.push(SignupPage);
	}
}
