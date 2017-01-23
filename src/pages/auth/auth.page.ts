import { Component, HostListener } from '@angular/core';

import { App } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard.page';
import { LoginPage } from '../login/login.page';
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

    @HostListener('window:resize', ['$event'])
    onResize() {}

    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
        /*
        if(this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
        return true;
        } else {
            return window.matchMedia(`(max-width: 960px)`).matches;
        }
        */
    }
}
