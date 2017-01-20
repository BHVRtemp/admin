import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TwitterConnect } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

import { Api } from '../../common';

@Injectable()
export class TwitterService {
	isCordova: Boolean;
	token: string;
	tokenSecret: string;

	constructor(platform: Platform, public api: Api) {

		this.isCordova = platform.is('cordova');

		if (!this.isCordova) {

			window.twitterCallback = data => {
				window.twitterResolve({
					oauth_token: this.token,
					oauth_token_secret: this.tokenSecret,
					oauth_verifier: data.oauth_verifier,
				});
			};

		}

	}
	login(): Observable<any> {

		if (this.isCordova) {
			return Observable.fromPromise(TwitterConnect.login());
		}

		return Observable.create(observer => {

			const w = this.openPopup('Twitter Signin', 500, 150);
			window.twitterResolve = data => {
				observer.next(data);
				observer.complete();	
			};

			this.api.post('/twitter-login-start', {
				origin: window.location.origin,
			})
				.map(response => response.json())
				.subscribe(response => {
					this.token = response.credentials.oauth_token;
					this.tokenSecret = response.credentials.oauth_token_secret;
					w.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=' + response.credentials.oauth_token;
		
				}, e => {
					logger.warn('Error while connecting with Twitter.', e.toString());
					observer.error(e);
				});

		});
	}

	private openPopup(title: string, w, h): Window {

		const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

		const width = window.innerWidth ?
						window.innerWidth :
						(document.documentElement.clientWidth ?
							document.documentElement.clientWidth :
							screen.width
						);
		const height = window.innerHeight ?
						window.innerHeight
						:
						(document.documentElement.clientHeight ?
							document.documentElement.clientHeight :
							screen.height
						);

		const left = ((width / 2) - (w / 2)) + dualScreenLeft;
		const top = ((height / 2) - (h / 2)) + dualScreenTop;
		return window.open(null, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	}

}
