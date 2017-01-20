import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
	templateUrl: 'about.page.html',
})
export class AboutPage {
	public firstName: string = 'Johny';
	
	constructor(public navCtrl: NavController) {

	}

}
