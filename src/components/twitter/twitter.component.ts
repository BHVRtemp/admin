import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api, UserService } from '../../common';
import { TwitterService } from './twitter.service';

@Component({
	selector: 'twitter-login',
	templateUrl: 'twitter.html',
})
export class TwitterComponent {
	@Output() onSuccess = new EventEmitter();

	constructor(
		public twitterService: TwitterService,
		public api: Api,
		public userService: UserService) {

	}
	login(): Observable<any> {

		return Observable.create(observer => {

			this.twitterService.login()
				.subscribe(twitterResponse => {
					this.api.post('/twitter-login', twitterResponse)
						.map(response => response.json())
						.subscribe(response => {
							
							this.userService.loggedIn(response);
							observer.next();
							observer.complete();
							this.onSuccess.emit();

						}, e => {
							logger.warn('Error while connecting with Twitter.', e);
							observer.error(e);
						});

				}, e => {
					logger.warn('Error while login with Twitter.', e);
					observer.error(e);
				});

		});
	}

}
