import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UsersPage } from '../../pages/users/users.page';
import { StationsPage } from '../../pages/stations/stations.page';
import { DashboardPage } from '../../pages/dashboard/dashboard.page';

@Component({
	templateUrl: 'link.html',
	selector: 'navigation-link',
})
export class NavigationLink {
	@Input() nav: NavController;
	@Input() page: string;
	@Input() title: string;
	@Input() icon: string;

	private pages = { UsersPage, StationsPage, DashboardPage };

	constructor() {}

	go() {
		this.nav.push(this.pages[this.page], null, { animate: false });
	}
}
