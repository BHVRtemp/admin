import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { CloudModule } from '@ionic/cloud-angular';

import { CommonModule } from '../common';

import { MyApp } from './app.component';

import { NavigationLink } from '../components/navigation/link.component';
import { UserDialogComponent } from '../components/users/user-dialog.component';

import { EntryPage } from '../pages/entry/entry.page';

import { LoginPage } from '../pages/login/login.page';
import { UsersPage } from '../pages/users/users.page';
import { StationsPage } from '../pages/stations/stations.page';

import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { AuthPage } from '../pages/auth/auth.page';
import { SendResetPasswordPage } from '../pages/reset-password/send-reset-password.page';
import { ResetPasswordPage } from '../pages/reset-password/reset-password.page';
import { ChangePasswordPage } from '../pages/profile/change-password.page';
import { EditProfilePage } from '../pages/profile/edit-profile.page';


import { TranslateComponent } from '../components/translate/translate.component';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
};

@NgModule({
	declarations: [
		MyApp,
		DashboardPage,
		ProfilePage,
		AuthPage,
		TranslateComponent,
		SendResetPasswordPage,
		ResetPasswordPage,
		EntryPage,
		ChangePasswordPage,
		EditProfilePage,
		LoginPage,
		UsersPage,
		StationsPage,
		NavigationLink,
		UserDialogComponent,
	],
	entryComponents: [
		MyApp,
		DashboardPage,
		ProfilePage,
		AuthPage,
		ResetPasswordPage,
		SendResetPasswordPage,
		EntryPage,
		ChangePasswordPage,
		EditProfilePage,
		LoginPage,
		UsersPage,
		StationsPage,
		UserDialogComponent,
	],
	imports: [
		IonicModule.forRoot(MyApp, {
			locationStrategy: true ? 'hash' : 'path',
		}, {
			links: [
				{ component: EntryPage, name: 'Entry', segment: 'entry' },

				{ component: AuthPage, name: 'Auth', segment: 'auth' },
				{ component: DashboardPage, name: 'Dashboard', segment: 'dashboard' },
				{ component: UsersPage, name: 'Users', segment: 'users' },
				{ component: StationsPage, name: 'Stations', segment: 'stations' },


				{ component: LoginPage, name: 'Login', segment: 'login' },
				{ component: SendResetPasswordPage, name: 'Send reset password', segment: 'send-reset-password', defaultHistory: [EntryPage] },
				{ component: ResetPasswordPage, name: 'Reset Password', segment: 'reset-password/:token' },
				
				{ component: ProfilePage, name: 'Profile', segment: 'profile' },
				{ component: ChangePasswordPage, name: 'Change password', segment: 'change-password', defaultHistory: [ProfilePage] },
				{ component: EditProfilePage, name: 'Edit Profile', segment: 'edit-profile', defaultHistory: [ProfilePage] },
				
			],
		}),

		// CloudModule.forRoot({
		// 	core: {
		// 		app_id: 'd0ed91f9',
		// 	},
		// }),

		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [Http],
		}),
		CommonModule,
		MaterialModule.forRoot(),
		NgxDatatableModule,
	],
	bootstrap: [IonicApp],
	providers: [
		
	],
})
export class AppModule {}
