import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { Logger } from 'common-frontend/index';

import { TabsPage } from '../pages/tabs/tabs.page';

@Component({
	template: `<ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
	rootPage = TabsPage;

	constructor(platform: Platform, translate: TranslateService, logger: Logger) {
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
				StatusBar.styleDefault();
				Splashscreen.hide();
			}
		});
	}
}
