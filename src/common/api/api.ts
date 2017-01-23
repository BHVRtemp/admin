import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
// import { Platform } from 'ionic-angular';
import { UserService } from '../user/user.service';
// import 'rxjs/add/operator/map';

@Injectable()
export class Api {
	// PROD WEB
	// private url: string = window.location.protocol + '//' + window.location.hostname + '/api';

	// DEV
	private url: string = window.location.protocol + '//' + window.location.hostname;

	constructor(public http: Http, public userService: UserService) { }

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

		options.headers = this.getAuthorizationHeaders();

		return this.http.get(this.url + endpoint, options);
	}

	post(endpoint: string, body: any, options?: RequestOptions) {
		if (!options) {
			options = new RequestOptions();
		}
		options.headers = this.getAuthorizationHeaders();
		return this.http.post(this.url + endpoint, body, options);
	}

	put(endpoint: string, body: any, options?: RequestOptions) {
		if (!options) {
			options = new RequestOptions();
		}
		options.headers = this.getAuthorizationHeaders();
		return this.http.put(this.url + endpoint, body, options);
	}

	delete(endpoint: string, body: any, options?: RequestOptions) {
		if (!options) {
			options = new RequestOptions();
		}
		options.headers = this.getAuthorizationHeaders();
		return this.http.post(this.url + endpoint, body, options);
	}

	patch(endpoint: string, body: any, options?: RequestOptions) {
		if (!options) {
			options = new RequestOptions();
		}
		options.headers = this.getAuthorizationHeaders();
		return this.http.put(this.url + '/' + endpoint, body, options);
	}

	private getAuthorizationHeaders(): Headers {
		const headers = new Headers();
		
		if (this.userService.token) {
			headers.append('Authorization', 'Bearer ' + this.userService.token);
		}

		return headers;
	}
}
