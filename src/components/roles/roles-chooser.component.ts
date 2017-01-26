
import { Component, OnInit, forwardRef, Input, OnChanges, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { Api } from '../../common';

export function validateIsNotEmpty(c: FormControl) {
	if (c.value.length === 0) return { notEmpty: true };
	return null;
}

@Component({
	selector: 'roles-chooser',
	templateUrl: 'roles-chooser.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RolesChooserComponent), multi: true },
		{ provide: NG_VALIDATORS, multi: true, useValue: validateIsNotEmpty },
	],
})
export class RolesChooserComponent implements ControlValueAccessor, OnChanges {

	@Input('value') _value = [];

	@ViewChild('roleValue') private roleValue: any;
	@ViewChildren('stationsView') private stationsView: QueryList<any>;
	private stationValues: any = [];

	/*
	* API get roles and Stations
	*/
	private rolesList: any[];
	private stationsList: any[];

	constructor(public api: Api) {

		api.get('/roles')
			.map(r => r.json())
			.subscribe(
				res => { this.rolesList = res.data.filter(r => r.level !== 4); },
				e => { logger.warn(e); },
			);

		api.get('/stations')
			.map(r => r.json())
			.subscribe(
				res => { this.stationsList = res.data; },
				e => { logger.warn(e); },
			);
		
	}
	/**
	 * Implements ControlValueAccessor
	 */
	public writeValue(value) {
		if (value) {
			this.value = value;
		}
	}
	public ngOnChanges(inputs) {}
	public registerOnChange(fn) {
		this.propagateChange = fn;
	}
	public registerOnTouched() {}
	private propagateChange: any = () => {};



	private remove(roleId) {
		this.value = [...this.value.filter(r => r.roleId !== roleId)];
	}

	private addStation(event) {
		event.preventDefault();

		const roleId = this.roleValue.value.id;

		const index = this.value.findIndex(r => r.roleId === roleId);
		if (index > -1) {
			// already existing
			this.value[index].stationIds = this.value[index].stationIds.concat(this.stationValues.map(s => s.id))
				.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

		} else {
			// not existing
			this.value = [...this.value, {
				roleId,
				stationIds: this.stationValues.map(s => s.id),
			}];
		}

		// re-init html components
		this.roleValue.value = null;
		this.stationValues = [];
		this.stationsView.toArray().forEach(s => s.checked = false);
	}

	private changeStation(station, $event) {
		if ($event.source.checked) {
			this.stationValues = [...this.stationValues, station];
		} else {
			this.stationValues = [...this.stationValues.filter(s => s.id !== station.id)];
		}
	}

	private validate(c: FormControl) {
		return validateIsNotEmpty(c);
	}





	get value() {
		return this._value;
	}
	set value(val) {
		this._value = val;
		this.propagateChange(val);
	}


	private getRoleLabel(roleId) {
		return this.rolesList.filter(r => r.id === roleId)[0].name;
	}
	private getStationLabel(stationId) {
		return this.stationsList.filter(s => s.id === stationId)[0].name;
	}
}
