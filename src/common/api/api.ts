import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
// import { Platform } from 'ionic-angular';
import { UserService } from '../user/user.service';
import { App, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login.page';
import { Environnement } from '../../env/main';
// import 'rxjs/add/operator/map';


@Injectable()
export class Api {

	private url: string;

	constructor(public http: Http, public userService: UserService, private environnement: Environnement, private app: App) {
		this.url = environnement.url;
	}

	get(endpoint: string, params?: any, options?: RequestOptions) {

		if (!options) {
			options = new RequestOptions();
		}

		// Support easy query params for GET requests
		if (params) {
			let p = new URLSearchParams();
			for (let k in params) {
				if (params.hasOwnProperty(k)) {
					p.set(k, params[k]);
				}
			}
			// Set the search field if we have params and don't already have
			// a search field set in options.
			options.search = !options.search && p || options.search;
		}


		return Observable.create(observer => {
			this.userService.waitUntilReady(() => {

				options.headers = this.getAuthorizationHeaders();

				this.http.get(this.url + endpoint, options)
					.subscribe(resp => {
						observer.next(resp);
					}, e => {
						this.userService.logout();
						this.app.getRootNav().setRoot(LoginPage, { message: 'INVALID_TOKEN' });
						observer.error(e);
					});
			});
		});
	}

	set(type: string, endpoint: string, body: any, options?: RequestOptions) {
		if (!options) {
			options = new RequestOptions();
		}

		return Observable.create(observer => {
			this.userService.waitUntilReady(() => {

				options.headers = this.getAuthorizationHeaders();

				this.http[type](this.url + endpoint, body, options)
					.subscribe(resp => {
						observer.next(resp);
					}, e => {
						this.userService.logout();
						this.app.getRootNav().setRoot(LoginPage, { message: 'INVALID_TOKEN' });
						observer.error(e);
					});
			});
		});
	}

	post(endpoint: string, body: any, options?: RequestOptions) {
		return this.set('post', endpoint, body, options);
	}

	put(endpoint: string, body: any, options?: RequestOptions) {
		return this.set('put', endpoint, body, options);
	}

	delete(endpoint: string, body: any, options?: RequestOptions) {
		return this.set('delete', endpoint, body, options);
	}

	patch(endpoint: string, body: any, options?: RequestOptions) {
		return this.set('patch', endpoint, body, options);
	}

	private getAuthorizationHeaders(): Headers {
		const headers = new Headers();

		if (this.userService.token) {
			headers.append('Authorization', 'Bearer ' + this.userService.token);
		}

		return headers;
	}
}
