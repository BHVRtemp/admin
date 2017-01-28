import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalValidator, Api, Station } from '../../common';
import { TranslateModule, TranslateService } from 'ng2-translate';

@Component({
	selector: 'stations-dialog',
	templateUrl: 'stations-dialog.html',
})

export class StationsDialogComponent {
	station;
	styles;
	private subscription;
	// Validation
	name: FormControl = new FormControl('', [Validators.required]);
	language: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
	domain: FormControl = new FormControl('', [Validators.required]);
	style: FormControl = new FormControl('', [Validators.required]);
	theme: FormControl = new FormControl('', [Validators.required]);
	type: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	error: string;

	form: FormGroup = this.formBuilder.group({
		name: this.name,
		domain: this.domain,
		language: this.language,
		style: this.style,
		theme: this.theme,
		type: this.type,
	});

	// Languages, Themes and Styles to be added to the two Select Input Fields dynamically
	languages = [
		{ value: 'fr', viewValue: 'STATIONS_DIALOG_LANGUAGE_FR' },
		{ value: 'en', viewValue: 'STATIONS_DIALOG_LANGUAGE_EN' },

	];

	constructor(
		public dialogRef: MdDialogRef<StationsDialogComponent>,
		private formBuilder: FormBuilder,
		public api: Api) {
		this.getDataFromApi('/stations/styles', "styles");
		this.getDataFromApi('/stations/themes', "themes");
		this.getDataFromApi('/stations/types', "types");

	}

	ngOnInit() {

		if (this.station) {
			this.name.setValue(this.station.name);
			this.language.setValue(this.station.language);
			this.domain.setValue(this.station.domain);
			this.style.setValue(this.station.style);
			this.theme.setValue(this.station.theme);
			this.type.setValue(this.station.type);
		}
	}

	post() { // Create New Station
		const sub = this.api.post('/stations', this.form.value);

		sub.map(res => res.json())
			.subscribe(res => {
				this.dialogRef.close(res.station);

			}, e => {
				logger.warn(e);
			});

		return sub;

	}

	put() { // Modify Existing Station
		this.form.value.id = this.station.id;
		const sub = this.api.put('/stations', this.form.value);

		sub.map(res => res.json())
			.subscribe(res => {
				this.dialogRef.close(res.station);

			}, e => {
				logger.warn(e);
			});

		return sub;
	}

	submit() {
		this.submitted = true;
		this.error = null;
		if (!this.form.valid) return;

		if (this.station) {
			return this.put();
		} else {
			return this.post();
		}
	}

	getDataFromApi(fromApi: string, type: string) { // Getting the Data Based on the Provided API (Used for Types, Themes and Themes)

		this.subscription = this.api.get(fromApi)
			.map(r => r.json())
			.subscribe(resp => {
				this[type] = resp.data;
			}, err => {
				logger.info(err);

			});

	}
}

