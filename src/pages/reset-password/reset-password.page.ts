import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../../pages/tabs/tabs.page';

@Component({
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
	constructor(public navCtrl: NavController) {}

	goTabs() {
		this.navCtrl.setRoot(TabsPage);
	}
}
