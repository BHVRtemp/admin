import { Component, HostListener } from '@angular/core';

import { App, NavController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard.page';
import { LoginPage } from '../login/login.page';
import { ProfilePage } from '../profile/profile.page';
import { UserService } from '../../common';

@Component({
	templateUrl: 'auth.html',
})
export class AuthPage {
	private rootPage = DashboardPage;

	constructor(private app: App, private userService: UserService) {}

	ngOnInit() {
		this.userService.waitUntilReady(() => {
			if (!this.userService.user) {
				this.app.getRootNav().setRoot(LoginPage);
			}
		});
	}

	logout() {
		this.userService.logout();
		this.app.getRootNav().setRoot(LoginPage);
	}

	goProfile(navCtrl: NavController) {
		navCtrl.push(ProfilePage, null, { animate: false });
	}

	@HostListener('window:resize', ['$event'])
	onResize() {}

	isOver(): boolean {
		return window.matchMedia(`(max-width: 960px)`).matches;
	}
}
