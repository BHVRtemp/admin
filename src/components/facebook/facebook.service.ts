import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FacebookService {
	isCordova: Boolean;

	constructor(platform: Platform) {

		this.isCordova = platform.is('cordova');

		if (!this.isCordova) {

			/* tslint:disable */
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = '//connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs);
			} (document, 'script', 'facebook-jssdk'));
			/* tslint:enable */

			window.fbAsyncInit = () => {

				logger.info('Facebook inited.');
				FB.init({
					appId: '1309220835785998',
					cookie: true,  // enable cookies to allow the server to access the session 
					xfbml: true,  // parse social plugins on this page
					version: 'v2.8', // use graph api version 2.8
				});

			};

		}

	}
	login(permissions: string[]): Observable<any> {

		if (this.isCordova) {
			return Observable.fromPromise(Facebook.login(permissions));
		}

		return Observable.create(observer => {
			FB.login(response => {
				if (response.status === 'connected') {
					observer.next(response);
					observer.complete();

				} else {
					observer.error(response);
				}
			}, { scope: permissions.join(',') });
		});
	}

	/*
	getLoginStatus(): Promise<any> {

		if (this.isCordova) {
			return Facebook.getLoginStatus();
		}

		return new Promise((resolve, reject) => {
			FB.getLoginStatus(response => {
				resolve(response);
			});
		});
	}
	*/
	/*
	api(requestPath: string, permissions?: string[]): Promise<any> {

		if (this.isCordova) {
			return Facebook.api(requestPath, permissions);
		}

		return new Promise((resolve, reject) => {
			FB.api(requestPath, null, null, response => {
				resolve(response);
			});
		});
	}
	*/
}
