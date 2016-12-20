import { NgModule } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about.page';
import { ContactPage } from '../pages/contact/contact.page';
import { HomePage } from '../pages/home/home.page';
import { TabsPage } from '../pages/tabs/tabs.page';

import { FacebookService } from '../bridge/facebook';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
};

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
	],
	imports: [
		IonicModule.forRoot(MyApp, {
			locationStrategy: isDevMode ? 'hash' : 'path',
		}, {
			links: [
				{ component: HomePage, name: 'Home', segment: 'home' },
				{ component: ContactPage, name: 'Contact', segment: 'contact' },
				{ component: AboutPage, name: 'About', segment: 'about' },
			],
		}),
		CloudModule.forRoot({
			core: {
				app_id: '4b2f12fd',
			},
		}),
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [Http],
		}),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
	],
	providers: [
		FacebookService,
	],
})
export class AppModule {}
