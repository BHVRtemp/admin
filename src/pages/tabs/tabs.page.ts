import { Component } from '@angular/core';

import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
	templateUrl: 'tabs.page.html',
})
export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = HomePage;
	tab2Root: any = AboutPage;
	tab3Root: any = ProfilePage;

	constructor() {

	}
}
