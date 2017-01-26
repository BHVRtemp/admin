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
	station: Station;
	// Validation
	name: FormControl = new FormControl('', [Validators.required]);
	language: FormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
	domain: FormControl = new FormControl('', [Validators.required]);
	style: FormControl = new FormControl('', [Validators.required]);
	theme: FormControl = new FormControl('', [Validators.required]);

	submitted: Boolean = false;
	error: string;

	form: FormGroup = this.formBuilder.group({
		name: this.name,
		domain: this.domain,
		language: this.language,
		style: this.style,
		theme: this.theme,
	});

	// Languages, Themes and Styles to be added to the two Select Input Fields dynamically
	languages = [
		{ value: 'fr', viewValue: 'STATIONS_DIALOG_LANGUAGE_FR' },
		{ value: 'en', viewValue: 'STATIONS_DIALOG_LANGUAGE_EN' },
		
	];
	themes = [
		{ value: 'sidebar_menu', viewValue: 'Sidebar Menu' },
		{ value: 'no_sidebar_menu', viewValue: 'No Sidebar Menu' },
		{ value: 'no_sidebar_no_menu', viewValue: 'No Sidebar No Menu' },
		{ value: 'sidebar_no_menu', viewValue: 'Sidebar No Menu' },
	];
	styles = [
		{ value: 'red', viewValue: 'Red' },
		{ value: 'blue', viewValue: 'Blue' },
		{ value: 'green', viewValue: 'Green' },
		{ value: 'purple', viewValue: 'Purple' },
		{ value: 'orange', viewValue: 'Orange' },
		{ value: 'yellow', viewValue: 'Yellow' },
		{ value: 'black', viewValue: 'Black' },
		{ value: 'white', viewValue: 'White' },
	];
	constructor(public dialogRef: MdDialogRef<StationsDialogComponent>,
		private formBuilder: FormBuilder,
		private translation: TranslateService,
		public api: Api) { }

	ngOnInit() {
		if (this.station) {
			this.name.setValue(this.station.name);
			this.language.setValue(this.station.language);
			this.domain.setValue(this.station.domain);
			this.style.setValue(this.station.style);
			this.theme.setValue(this.station.theme);
		}
	}

	post() {
		const sub = this.api.post('/station', this.form.value);

		sub.map(res => res.json())
			.subscribe(res => {
				this.dialogRef.close(res.station);

			}, e => {
				logger.warn(e);
			});

		return sub;

	}

	put() {
		this.form.value.id = this.station.id;
		const sub = this.api.put('/station', this.form.value);

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
}

