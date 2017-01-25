import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { StationsDialogComponent } from '../../components/stations/stations-dialog.component';
// import { NavController } from 'ionic-angular';

@Component({
	 templateUrl: 'stations.html',
})
export class StationsPage {
	stationData={};

	/*name:string;
	language:string;
	domain:string;
	style:string;
	theme:string;*/
	 constructor(public dialog: MdDialog) {}
	 openDialog() {
			let dialogRef = this.dialog.open(StationsDialogComponent);
			dialogRef.afterClosed().subscribe(result => {
			
			});
  	}
}
 
 

