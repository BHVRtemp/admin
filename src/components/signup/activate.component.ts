import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { Api, UserService } from '../../common';
import { TabsPage } from '../../pages/tabs/tabs.page';

@Component({
	selector: 'user-activate',
	templateUrl: 'activate.html',
})
export class UserActivateComponent {
	error: string;

	constructor(public navCtrl: NavController, public api: Api, public userService: UserService, private _app: App) { }
		
	
	ngAfterViewInit() {
		const token = this.navCtrl.getActive().getNavParams().data.token;

		this.api.post('/user/activate', { token })
			.map(resp => resp.json())
			.subscribe(resp => {
				this._app.getRootNav().setRoot(TabsPage);
				this.userService.loggedIn(resp);

			}, e => {

				let errorMessage = 'UNKNOWN_ERROR';
				try {
					const err = e.json();
					if (err && err.message) {
						this.error = err.message;
					}
					
				} catch (e) {
					logger.warn('error', e);
				}
			});
	}

}
