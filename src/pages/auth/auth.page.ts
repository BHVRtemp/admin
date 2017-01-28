import { Component, HostListener } from '@angular/core';

import { App, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { DashboardPage } from '../dashboard/dashboard.page';
import { LoginPage } from '../login/login.page';
import { ProfilePage } from '../profile/profile.page';
import { UserService, Api } from '../../common';

@Component({
	templateUrl: 'auth.html',
})
export class AuthPage {
	private rootPage = DashboardPage;

	constructor(private app: App, private userService: UserService, private translateService: TranslateService, public api: Api) {}

	ngOnInit() {
		this.userService.waitUntilReady(() => {
			if (!this.userService.user) {
				this.app.getRootNav().setRoot(LoginPage);

			} else {
				// Update User Profile
				this.api.get('/profile').map(res => res.json())
					.subscribe(res => {
						this.userService.user = res.user;
						this.setLang();

					}, e => {
						logger.warn(e);
					});
				this.setLang();
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

	private setLang() {
		// Set User Language
		const lang = this.userService.user.defaultLanguage;
		if (lang === 'fr' || lang === 'en') {
			this.translateService.use(lang);
		}
	}
}
