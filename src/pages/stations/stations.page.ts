import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { StationsDialogComponent } from '../../components/stations/stations-dialog.component';
// import { NavController } from 'ionic-angular';
import { Api, Station } from '../../common';
@Component({
	templateUrl: 'stations.html',
})
export class StationsPage {
	public ready: Boolean = false;
	public stations: Station[];
	public temp: Station[];
	private subscription;
	private dialogConfig: MdDialogConfig = { disableClose: true, width: '600px' };
	
	constructor(private api: Api, public dialog: MdDialog) { 
		this.subscription = api.get('/stations') // Get The List of All Stations
			.map(r => r.json())
			.subscribe(resp => {
				this.stations = resp.data;
				this.temp = [...this.stations];
				this.ready = true;

			}, err => {
				logger.info(err);
			});
	}
	ionViewWillLeave() {
		this.subscription.unsubscribe();
	}
	addStation() { // Add Station
		let dialogRef = this.dialog.open(StationsDialogComponent, this.dialogConfig);
		dialogRef.afterClosed().subscribe(result => {
			if (typeof result !== 'undefined') { // A Station is Added and the User didn't Cancel the Operation
				this.stations.push(result);
				this.temp.push(result);
			}
		
		});
	}
	public editStation(station: Station) {// Edit Selected Station
		let dialogRef = this.dialog.open( StationsDialogComponent, this.dialogConfig );
		dialogRef.componentInstance.station = station;
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				for (let i in station) {
					if (station.hasOwnProperty(i)) {
						station[i] = result[i];
					}
				}
			}
		});	
	}
	public setActive(station: Station, isActive: Boolean ) {
		this.api.put('/stations', { id: station.id, isActive })
			.subscribe(() => {
				station.isActive = isActive;
			});
	}
	public updateFilter(event) { // Filtring List of Stations by mame
		const val = event.target.value.toLowerCase();
		this.stations = this.temp.filter(function(station) {
			if (!val) return true; // no value
			if (station.name.toLowerCase().indexOf(val) !== -1) return true; // Name
			const stationName = station.name.toLowerCase();
			return stationName.indexOf(val) !== -1 ;
		});
	}
	 
}



