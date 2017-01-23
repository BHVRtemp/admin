import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api, UserService } from '../../common';
import { GoogleService } from './google.service';

@Component({
	selector: 'google-login',
	templateUrl: 'google.html',
})
export class GoogleComponent {
	@Output() onSuccess = new EventEmitter();

	constructor(
		public googleService: GoogleService,
		public api: Api,
		public userService: UserService) {

	}
	login(): Observable<any> {

		return Observable.create(observer => {

			this.googleService.login()
			.subscribe(googleResponse => {

				this.api.post('/google-login', googleResponse)
					.map(response => response.json())
					.subscribe(response => {
						this.userService.loggedIn(response);
						observer.next();
						observer.complete();
						this.onSuccess.emit();

					}, e => {
						logger.warn('Error while connecting with Google.', e);
						observer.error(e);
					});

			}, e => {
				logger.warn('Error while connecting with Google.', e);
				observer.error(e);
				
			});

		});

	}

}
