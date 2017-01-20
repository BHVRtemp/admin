import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api, UserService } from '../../common';
import { FacebookService } from './facebook.service';

@Component({
	selector: 'facebook-login',
	templateUrl: 'facebook.html',
})
export class FacebookComponent {
	@Output() onSuccess = new EventEmitter();

	constructor(
		public facebookService: FacebookService,
		public api: Api,
		public userService: UserService) {

	}
	login(): Observable<any> {
		
		return Observable.create(observer => {

			this.facebookService.login(['email']).subscribe(facebookResponse => {

				this.api.post('/facebook-login', facebookResponse.authResponse)
					.map(response => response.json())
					.subscribe(response => {
						this.userService.loggedIn(response);

						observer.next();
						observer.complete();
						this.onSuccess.emit();

					}, e => {
						logger.warn('Error while connecting with Facebook.', e);
						observer.error(e);
					});

			}, e => {
				logger.warn('Error while login with Facebook.', e);
				observer.error(e);
			});

		});

	}

}
