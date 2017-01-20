import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { Http } from '@angular/http';

import { User } from './user.model';

@Injectable()
export class UserService {
	private _user: User;
	private _token: String;

	constructor(public storage: Storage, public zone: NgZone) {

		storage.get('user').then(user => {
			this.zone.run(() => { this._user = user; });
		});
		storage.get('jsonwebtoken').then(token => {
			this._token = token;
		});
	}

	get user(): any {
		return this._user;
	}
	set user(user) {
		this.zone.run(() => { this._user = user; });
		this.storage.set('user', user);
	}
	get token(): String {
		return this._token;
	}
	set token(token) {
		this._token = token;
		this.storage.set('jsonwebtoken', token);
	}

	logout() {
		this.user = null;
		this.token = null;
	}

	loggedIn(data) {
		this.user = data.user;
		this.token = data.token;
	}
}
