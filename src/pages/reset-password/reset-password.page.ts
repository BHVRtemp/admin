import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { AuthPage } from '../auth/auth.page';

// import { TabsPage } from '../../pages/tabs/tabs.page';

@Component({
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
	constructor(private _app: App) {}

	goAuth() {
		this._app.getRootNav().setRoot(AuthPage);
	}
}
