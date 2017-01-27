import { Injectable } from '@angular/core';

@Injectable()
export class Environnement {
	public url: string = window.location.protocol + '//' + window.location.hostname + '/api';
}
