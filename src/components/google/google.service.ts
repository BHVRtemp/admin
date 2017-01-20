import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoogleService {
	isCordova: Boolean;

	constructor(platform: Platform) {

		this.isCordova = platform.is('cordova');

		if (!this.isCordova) {

			const script = document.createElement('script');
			script.setAttribute('src',
				'https://apis.google.com/js/platform.js?onload=initGooglePlusCallback');
			document.head.appendChild(script);

			window.initGooglePlusCallback = () => {
				logger.info('Google inited.');
				gapi.load('auth2', () => {
					gapi.auth2.init({
						client_id: '689277329769-860o03j2mfhm6lud73p8fchu837idtno.apps.googleusercontent.com',
					});
				});

			};
		}

	}
	login(): Observable<any> {

		if (this.isCordova) {
			return Observable.fromPromise(GooglePlus.login({
				webClientId: '193576669452-8fou2d785b4aejap177um11a91kodia1',
			}));
		}

		return Observable.create(observer => {

			gapi.auth2.getAuthInstance().signIn()
				.then(() => {

					observer.next({
						idToken: gapi.auth2.getAuthInstance()
										.currentUser.get()
										.getAuthResponse().id_token,
					});
					observer.complete();
				
				}, e => {
					observer.error(e);
				});
		});
	}

}
