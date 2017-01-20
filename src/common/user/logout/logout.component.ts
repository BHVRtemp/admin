import { Component, Output, EventEmitter } from '@angular/core';

import { UserService } from '../user.service';

@Component({
	selector: 'logout-component',
	templateUrl: 'logout.html',
  	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
	@Output() onSuccess = new EventEmitter();

	user: any;

	constructor(public userService: UserService) {}
	
	logout() {
		this.userService.logout();
		this.onSuccess.emit();
	}
}
