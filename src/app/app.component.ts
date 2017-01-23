import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { Logger } from '../common';

import { EntryPage } from '../pages/entry/entry.page';

@Component({
	template: `
		<ion-nav [root]="rootPage"></ion-nav>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	`,
})
export class MyApp {
	rootPage = EntryPage;

	constructor(platform: Platform, translate: TranslateService, logger: Logger) {
		console.log(platform.platforms());

		translate.setDefaultLang('en');
		translate.use('en');

		platform.ready().then(() => {
			if (platform.is('cordova')) {
				StatusBar.styleDefault();
				Splashscreen.hide();
			}
		});
	}
}
