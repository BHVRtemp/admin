import { Component } from '@angular/core';

import { UserService } from '../../common';

@Component({
	templateUrl: 'profile.html',
})
export class ProfilePage {
	constructor(private userService: UserService) {}
}
