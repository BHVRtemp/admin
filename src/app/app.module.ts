import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { CloudModule } from '@ionic/cloud-angular';

import { CommonModule } from '../common';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { HomePage } from '../pages/home/home.page';
import { TabsPage } from '../pages/tabs/tabs.page';
import { SignupPage } from '../pages/signup/signup.page';
import { SendResetPasswordPage } from '../pages/reset-password/send-reset-password.page';
import { ResetPasswordPage } from '../pages/reset-password/reset-password.page';
import { LoginPage } from '../pages/login/login.page';
import { ChangePasswordPage } from '../pages/profile/change-password.page';
import { EditProfilePage } from '../pages/profile/edit-profile.page';
import { EntryPage } from '../pages/entry/entry.page';

import { TranslateComponent } from '../components/translate/translate.component';
import { FacebookComponent } from '../components/facebook/facebook.component';
import { FacebookService } from '../components/facebook/facebook.service';
import { GoogleComponent } from '../components/google/google.component';
import { GoogleService } from '../components/google/google.service';
import { TwitterComponent } from '../components/twitter/twitter.component';
import { TwitterService } from '../components/twitter/twitter.service';
import { SignupComponent } from '../components/signup/signup.component';
import { UserActivateComponent } from '../components/signup/activate.component';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
};

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ProfilePage,
		HomePage,
		TabsPage,
		FacebookComponent,
		TwitterComponent,
		GoogleComponent,
		TranslateComponent,
		SignupComponent,
		SignupPage,
		SendResetPasswordPage,
		ResetPasswordPage,
		LoginPage,
		EntryPage,
		ChangePasswordPage,
		EditProfilePage,
		UserActivateComponent,
	],
	entryComponents: [
		MyApp,
		AboutPage,
		ProfilePage,
		HomePage,
		TabsPage,
		ResetPasswordPage,
		SignupPage,
		SendResetPasswordPage,
		LoginPage,
		EntryPage,
		ChangePasswordPage,
		EditProfilePage,
		UserActivateComponent,
	],
	imports: [
		IonicModule.forRoot(MyApp, {
			locationStrategy: true ? 'hash' : 'path',
		}, {
			links: [
				{ component: EntryPage, name: 'Entry', segment: 'entry' },
				{ component: LoginPage, name: 'Login', segment: 'login', defaultHistory: [EntryPage] },
				{ component: SendResetPasswordPage, name: 'Send reset password', segment: 'send-reset-password', defaultHistory: [EntryPage, LoginPage] },
				{ component: ResetPasswordPage, name: 'Reset Password', segment: 'reset-password/:token' },
				{ component: SignupPage, name: 'Signup', segment: 'signup', defaultHistory: [EntryPage] },
				{ component: UserActivateComponent, name: 'Signup activation', segment: 'user/activate/:token' },
				

				{ component: HomePage, name: 'Home', segment: 'home' },
				{ component: ProfilePage, name: 'Profile', segment: 'profile' },
				{ component: ChangePasswordPage, name: 'Change password', segment: 'change-password', defaultHistory: [ProfilePage] },
				{ component: EditProfilePage, name: 'Edit Profile', segment: 'edit-profile', defaultHistory: [ProfilePage] },
				{ component: AboutPage, name: 'About', segment: 'about' },
			],
		}),

		CloudModule.forRoot({
			core: {
				app_id: 'd0ed91f9',
			},
		}),

		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [Http],
		}),
		CommonModule,
	],
	bootstrap: [IonicApp],
	providers: [
		FacebookService,
		GoogleService,
		TwitterService,
	],
})
export class AppModule {}
