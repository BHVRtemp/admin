import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import filter from 'lodash-es/filter';

@Component({
	templateUrl: 'home.page.html',
})
export class HomePage {
	public canvas: any;

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

}
