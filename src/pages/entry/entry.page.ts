import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthPage } from '../auth/auth.page';
import { LoginPage } from '../login/login.page';
import { UserService } from '../../common';
import { Api } from '../../common/api/api';
@Component({
	template: '',
})
export class EntryPage {
	constructor(private navCtrl: NavController, private app: App, private userService: UserService, public api: Api, public storage: Storage) { }

	ngOnInit() {
		this.userService.waitUntilReady(() => {
			if (this.userService.user) {
				// Update User Profile
				const sub = this.api.get('/profile');
				sub.map(res => res.json())
					.subscribe(res => {
						this.userService.user = res.user;
					}, e => {
						logger.warn(e);
					});

				this.app.getRootNav().setRoot(AuthPage);
			} else {
				this.app.getRootNav().setRoot(LoginPage);
			}
		});
	}
}
