import { StationsDialogComponent } from './stations-dialog.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { ToastController } from 'ionic-angular';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import * as Rx from 'rxjs/Rx';
import { Api, Station } from '../../common';
// import { LoginPage } from '../../pages/login/login.page';

describe('StationsDialog Component', () => {
	
	let comp: StationsDialogComponent;
	let fixture: ComponentFixture<StationsDialogComponent>;
	let de: DebugElement;

	let apiStub;
	let dialogRefStub;
	let stationUpdate;
	const apiResponse = { status: 1, station: { a: 'b' } };
	const apiResponsePut = { status: 1, station: { b: 'b' } };
	let validStation;

	const updateForm = station => {
		comp.form.controls['name'].setValue(station.name);
		comp.form.controls['language'].setValue(station.language);
		comp.form.controls['domain'].setValue(station.domain);
		comp.form.controls['style'].setValue(station.style);
		comp.form.controls['theme'].setValue(station.theme);
		comp.form.controls['type'].setValue(station.type);
	};
	const updateField = (field, value) => {
		comp.form.controls[field].setValue(value);
	};
	const configure = () => {
		validStation = {
			name: 'Jawhara',
			language: 'fr_CA',
			domain: 'jawharafm.com',
			style: 'blue',
			theme: 'sidebar_menu',
			type: 'Music',
		};

		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [StationsDialogComponent],
			imports: [ReactiveFormsModule, TranslateModule.forRoot()],
			providers: [
				{ provide: MdDialogRef, useValue: dialogRefStub },
				FormBuilder,
				{ provide: Api, useValue: apiStub },
			],
		});
		fixture = TestBed.createComponent(StationsDialogComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
		
	};
	describe('component and form validity', () => {
		beforeEach(() => {
			apiStub = {};

			configure();
		});
		it('should be defined', () => {
			expect(comp).toBeDefined();
		});
		it('submitted should be inited to false', () => {
			expect(comp.submitted).toBe(false);
		});
		it('should have default fields empty', () => {
			expect(comp.form.value).toEqual({ name: '', language: '', domain: '', style: '', theme: '', type: '' });
		});
		it('form value should update from form changes', () => {
			updateForm(validStation);
			expect(comp.form.value).toEqual(validStation);
		});
		it('form should be valid with valid station', () => {
			updateForm(validStation);
			expect(comp.form.valid).toBe(true);
		});
		it('form validity should be false when name is empty', () => {
			updateForm(validStation);
			updateField('name', '');
			expect(comp.form.valid).toBe(false);
		});
		it('form validity should be false when language is empty', () => {
			updateForm(validStation);
			updateField('language', '');
			expect(comp.form.valid).toBe(false);
		});
		it('form validity should be false when language is length less than five', () => {
			updateForm(validStation);
			updateField('language', 'aaaa');
			expect(comp.form.valid).toBe(false);
		});
		it('form validity should be false when domain is empty', () => {
			updateForm(validStation);
			updateField('domain', '');
			expect(comp.form.valid).toBe(false);
		});
		it('form validity should be false when style is empty', () => {
			updateForm(validStation);
			updateField('style', '');
			expect(comp.form.valid).toBe(false);
		});
		it('form validity should be false when theme is empty', () => {
			updateForm(validStation);
			updateField('theme', '');
			expect(comp.form.valid).toBe(false);
		});

	});
	describe('submit()', () => {
		beforeEach(() => {
			apiStub = jasmine.createSpyObj('Api', ['post', 'put']);
			apiStub.post.and.returnValue(Rx.Observable.of({
				json: () => apiResponse,
			}));
			apiStub.put.and.returnValue(Rx.Observable.of({
				json: () => apiResponsePut,
			}));
			dialogRefStub = jasmine.createSpyObj('dialogRef', ['close']);

			configure();
		});

		it('should return undefined and not call api post if form is invalid', () => {
			updateForm(validStation);
			updateField('name', '');

			const result = comp.submit();
			expect(result).not.toBeDefined();
			expect(apiStub.post).not.toHaveBeenCalled();

		});
		it('should return the sub and call api post if form is valid', () => {
			updateForm(validStation);

			const result = comp.submit();
			expect(result).toBeDefined();

			result.subscribe(() => {
				expect(apiStub.post).toHaveBeenCalledWith('/stations', validStation);
				expect(dialogRefStub.close).toHaveBeenCalledWith(apiResponse.station);
			});

		});
		it('should set submitted to true if form is valid', () => {
			updateForm(validStation);
			comp.submit();
			expect(comp.submitted).toBe(true);

		});
		it('should set submitted to true if form is not valid', () => {
			updateForm(validStation);
			updateField('name', '');
			comp.submit();
			expect(comp.submitted).toBe(true);
		});
		it('should be valid if station is defined', () => {
			updateForm(validStation);
			comp.station = validStation;
			expect(comp.station).not.toBe(undefined);
		});
		it('should return the sub and call api put if form is valid', () => {
			updateForm(validStation);
			validStation.id = 5;

			comp.station = validStation;
			comp.station.id = 5;
			const result = comp.submit();
			expect(result).toBeDefined();

			result.subscribe(() => {
				expect(apiStub.put).toHaveBeenCalledWith('/stations', validStation);
				expect(apiStub.post).not.toHaveBeenCalled();
				expect(dialogRefStub.close).toHaveBeenCalledWith(apiResponsePut.station);
			});

		});

	});
	
});
