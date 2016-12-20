import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';

import { TabsPage } from '../pages/tabs/tabs.page';

@Component({
	template: `<ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
	rootPage = TabsPage;

	constructor(platform: Platform, translate: TranslateService) {
		console.log(platform.platforms());

		translate.setDefaultLang('en');
		translate.use('en');

		translate.setTranslation('en', {
			HELLO: 'Hello {{name}} !',
		});
		translate.setTranslation('fr', {
			HELLO: 'Salut {{name}} !',
		});

		platform.ready().then(() => {
			if (!platform.is('core')) {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				StatusBar.styleDefault();
				Splashscreen.hide();
			}
		});
	}
}
