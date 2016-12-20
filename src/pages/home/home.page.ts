import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import filter from 'lodash-es/filter';
import { TranslateService } from 'ng2-translate';
// import { FacebookService } from '../../bridge/facebook';

@Component({
	selector: 'page-home',
	templateUrl: 'home.page.html',
})
export class HomePage {
	public user: any;
	public changeLang;
	public canvas: any;

	constructor(public navCtrl: NavController,
				public translate: TranslateService,
				// public facebookService: FacebookService
				) {

		const myArr = [
			{
				name: 'barney',
				age: 36,
				active: true,
			},
			{
				name: 'fred',
				age: 40,
				active: false,
			}];

		this.user = (filter(myArr, o => o.active))[0];

		this.changeLang = (lang: string): void => {
			translate.use(lang);
		};

	}
	ngAfterViewInit() {
		/*
		const canvas:any = document.getElementById('canvas');
		if (canvas.getContext) {
			const ctx = canvas.getContext("2d");

			ctx.beginPath();
			let x              = 200;                 // Coordonnée x
			let y              = 200;
			let rayon          = 150;                      // Rayon de l'arc
			let angleInitial     = Math.PI/5;                     // Point de départ sur le cercle
			let angleFinal       = Math.PI-angleInitial; // Point d'arrivée sur le cercle
			let antihoraire  = true;     // Horaire ou antihoraire

			ctx.arc(x, y, rayon, angleInitial, angleFinal, antihoraire);

			// ctx.fill();
			ctx.stroke();

			ctx.beginPath();
			x              = 200;                 // Coordonnée x
			y              = 200;
			rayon          = 70;                      // Rayon de l'arc
			angleInitial     = Math.PI/5;                     // Point de départ sur le cercle
			angleFinal       = Math.PI-angleInitial; // Point d'arrivée sur le cercle
			antihoraire  = true;     // Horaire ou antihoraire

			ctx.arc(x, y, rayon, angleInitial, angleFinal, antihoraire);

			// ctx.fill();
			ctx.stroke();
			
			ctx.beginPath();
			let x              = 200;                 // Coordonnée x
			let y              = 200;
			let rayon          = 50;                      // Rayon de l'arc
			let angleInitial     = 0;                     // Point de départ sur le cercle
			let angleFinal       = 2*Math.PI; // Point d'arrivée sur le cercle
			let antihoraire  = true;     // Horaire ou antihoraire

			ctx.arc(x, y, rayon, angleInitial, angleFinal, antihoraire);

			//ctx.fill();
			ctx.stroke();
		}
			*/

	}
	facebookLogin() {
		console.log('plouf');
		/*
		Facebook.login(["email"])
		.then(response=>{
			console.log(response);
		});
		*/
	}

}
