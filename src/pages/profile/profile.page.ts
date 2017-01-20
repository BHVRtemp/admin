import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { UserService } from '../../common';

import { EntryPage } from '../entry/entry.page';
import { ChangePasswordPage } from '../profile/change-password.page';
import { EditProfilePage } from '../profile/edit-profile.page';

@Component({
	templateUrl: 'profile.html',
})
export class ProfilePage {

	constructor(public navCtrl: NavController, public userService: UserService) {}

	goEntry() {
		this.navCtrl.setRoot(EntryPage);
	}
	goChangePassword() {
		this.navCtrl.push(ChangePasswordPage);
	}
	goEditProfile() {
		this.navCtrl.push(EditProfilePage);
	}
}
