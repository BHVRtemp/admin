import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { Http } from '@angular/http';

import { User } from './user.model';

@Injectable()
export class UserService {
	private _user: User;
	private _token: String;
	private ready: number = 0;
	private readyCbs: (() => void)[] = [];

	constructor(public storage: Storage, public zone: NgZone) {

		storage.get('user').then(user => {
			this.zone.run(() => { this._user = user; });
			this.callIsReady();
		});
		storage.get('jsonwebtoken').then(token => {
			this._token = token;
			this.callIsReady();
		});
	}

	public waitUntilReady(cb) {
		if (this.ready === 2) {
			cb();
		} else {
			this.readyCbs.push(cb);
		}
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

	public logout(): void {
		this.user = null;
		this.token = null;
	}

	public loggedIn(data: {user: any, token: any}): void {
		this.user = data.user;
		this.token = data.token;
	}

	private callIsReady() {
		this.ready++;
		if (this.ready === 2) {
			this.readyCbs.forEach(cb => {
				cb();
			});
			this.readyCbs = [];
		}
	}
}
