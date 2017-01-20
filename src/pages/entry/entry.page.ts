import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs.page';
import { SignupPage } from '../signup/signup.page';
import { LoginPage } from '../login/login.page';

@Component({
	templateUrl: 'entry.html',
})
export class EntryPage {
	constructor(public navCtrl: NavController) {}

	goHome() {
		logger.info('go home');
		this.navCtrl.setRoot(TabsPage);
		
	}

	goSignUp() {
		this.navCtrl.push(SignupPage);
	}
	goLogin() {
		this.navCtrl.push(LoginPage);
	}
}
