import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Api, User } from '../../common';
import { UserDialogComponent } from '../../components/users/user-dialog.component';

@Component({
	templateUrl: 'users.html',
})
export class UsersPage {
	public users: User[];
	public temp: User[];
	public ready: Boolean = false;
	private subscription;
	private dialogConfig: MdDialogConfig = { disableClose: true, width: '600px' };

	constructor(private api: Api, private dialog: MdDialog) {


		this.subscription = api.get('/users')
			.map(r => r.json())
			.subscribe(resp => {
				this.users = resp.data;
				this.temp = [...this.users];
				this.ready = true;

				// this.edit(this.users[0]);
			}, err => {
				logger.info(err);
			});

	}
	ionViewWillLeave() {
		this.subscription.unsubscribe();
	}

	private add() {
		const dialogRef: MdDialogRef<any> = this.dialog.open(UserDialogComponent, this.dialogConfig);

		dialogRef.afterClosed().subscribe(result => {
			if (typeof result !== 'undefined') { // A User is Added and the User didn't Canceled the Operation
				this.users.push(result);
				this.temp.push(result);
			}
		});
	}
 
	private edit(user: User) {
		const dialogRef: MdDialogRef<any> = this.dialog.open(UserDialogComponent, this.dialogConfig);
		dialogRef.componentInstance.user = user;

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				for (let i in user) {
					if (user.hasOwnProperty(i)) {
						user[i] = result[i];
					}
				}
			}
		});
	}

	private setActive(user: User, isActive: Boolean) {
		this.api.put('/users', { id: user.id, isActive })
			.subscribe(() => {
				user.isActive = isActive;
			});
	}


	private updateFilter(event) {
		const val = event.target.value.toLowerCase();

		this.users = this.temp.filter(function(user) {
			if (!val) return true; // no value
			if (user.username.toLowerCase().indexOf(val) !== -1 || user.email.indexOf(val) !== -1) return true; // email && username

			const name1 = user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase(); // firstName lastName
			const name2 = user.lastName.toLowerCase() + ' ' + user.firstName.toLowerCase(); // lastName firstName
			return name1.indexOf(val) !== -1 || name2.indexOf(val) !== -1;
		});
	}

}
