import { Component } from '@angular/core';

import { Api, User , UserService} from '../../common';

@Component({
	templateUrl: 'users.html',
})
export class UsersPage {
	public users: User[];
	public ready: Boolean = false;

	public columns = [
		{ prop: 'firstName' },
		{ prop: 'lastName', name: 'Last Name' }
	];

	constructor(private api: Api, private userService: UserService) {

		api.get('/users')
			.map(r => r.json())
			.subscribe(resp => {

				console.log(resp);
				// this.users = resp.data;
				// this.ready = true;

			}, err => {

				logger.info(err);
			});
		
	}
}
