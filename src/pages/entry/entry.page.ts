import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs.page';
import { SignupPage } from '../signup/signup.page';
import { LoginPage } from '../login/login.page';

@Component({
	templateUrl: 'entry.html',
})
export class EntryPage {
	constructor(public navCtrl: NavController, private _app: App) {}

	goHome() {
		this._app.getRootNav().setRoot(TabsPage);
	}

	goSignUp() {
		this.navCtrl.push(SignupPage);
	}
	goLogin() {
		this.navCtrl.push(LoginPage);
	}
}
