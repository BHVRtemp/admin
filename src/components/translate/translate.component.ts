import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
	selector: 'translate',
	templateUrl: 'translate.html',
})
export class TranslateComponent {
	public changeLang;

	constructor(public translate: TranslateService) {

		this.changeLang = (lang: string): void => {
			translate.use(lang);
		};

	}

}
