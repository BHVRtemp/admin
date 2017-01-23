import { Component } from '@angular/core';
import { App } from 'ionic-angular';

// import { TabsPage } from '../../pages/tabs/tabs.page';

@Component({
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
	constructor(private _app: App) {}

	goTabs() {
		// this._app.getRootNav().setRoot(TabsPage);
	}
}
