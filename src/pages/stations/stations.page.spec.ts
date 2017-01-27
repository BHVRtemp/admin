import { StationsPage } from './stations.page';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { ToastController } from 'ionic-angular';
import { MdDialog, MdDialogRef, MaterialModule } from '@angular/material';
import * as Rx from 'rxjs/Rx';
import { Api, Station } from '../../common';
import { StationsDialogComponent } from '../../components/stations/stations-dialog.component';

describe('stations-page Component', () => {
	/*
	let comp: StationsPage;
	let fixture: ComponentFixture<StationsPage>;
	let de: DebugElement;

	let apiStub;
	let dialogStub;

	const apiResponse = {
		status: 1, data: [
			{ id: 1, name: 'NRJ', language: 'en_CA', domain: 'nrj.fr', style: 'red', theme: 'no_side_bar', isActive: true },
			{ id: 2, name: 'Beat', language: 'en_CA', domain: 'beat.ca', style: 'red', theme: 'no_side_bar', isActive: false },
			{ id: 3, name: 'Jawhara', language: 'fr_CA', domain: 'jaw.com', style: 'blue', theme: 'no_side_bar', isActive: false },
			{ id: 4, name: 'Knooz', language: 'fr_CA', domain: 'knooz.com', style: 'blue', theme: 'no_side_bar', isActive: true },
		],
	};
	const apiResponsePut = { status: 1, station: { id: 5, name: 'NewNRJ', language: 'en_CA', domain: 'Nenrj.fr', style: 'red', theme: 'no_side_bar', isActive: true } };

	const configure = () => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [StationsPage, StationsDialogComponent],
			imports: [ReactiveFormsModule, TranslateModule.forRoot(), MaterialModule.forRoot()],
			providers: [
				{ provide: Api, useValue: apiStub },
				MdDialog,
			],
		});
		fixture = TestBed.createComponent(StationsPage);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	};

	describe('page and content validity', () => {
		beforeEach(() => {
			apiStub = jasmine.createSpyObj('Api', ['get', 'put']);
			apiStub.get.and.returnValue(Rx.Observable.of({
				json: () => apiResponse,
			}));
			apiStub.put.and.returnValue(Rx.Observable.of({
				json: () => apiResponsePut,
			}));
			dialogStub = jasmine.createSpyObj('MdDialog', ['open']);
			dialogStub.open.and.returnValue({
				afterClosed() { return Rx.Observable.of(apiResponsePut); },
			});

			configure();
		});
		it('should be defined', () => {
			expect(comp).toBeDefined();
		});
		it('stations list should no be  empty', () => {
			expect(comp.stations.length).not.toBe(0);
		});
		it('page should be ready', () => {
			expect(comp.ready).not.toBe(false);
		});

		it('should filter stations list ', () => {
			const event = {
				preventDefault: jasmine.createSpy(),
				target: {
					value: 'bea',
				},
			};

			comp.updateFilter(event);
			expect(comp.stations.length).toEqual(1);
			expect(comp.stations[0].id).toEqual(2);
		});

		it('should activate station ', () => {

			comp.setActive(comp.stations[1], true);
			expect(comp.stations[1].isActive).toBe(true);

		});
		it('should desactivate station ', () => {

			comp.setActive(comp.stations[0], false);
			expect(comp.stations[0].isActive).toBe(false);

		});
		it('should add a new station ', () => {

			TestBed.compileComponents().then(() => {
				const stationsLength = comp.stations.length;
				comp.addStation();
				expect(comp.stations.length).toBeGreaterThan(stationsLength);
			});
		});
		it('should edit a station ', () => {

			const station = { id: 1, name: 'NRJ', language: 'fr_CA', domain: 'nrj.fr', style: 'red', theme: 'no_side_bar', isActive: true };
			TestBed.compileComponents().then(() => {
				comp.editStation(station);
				expect(comp.stations[0].language).not.toEqual('en_CA');
				expect(comp.stations[0].language).toEqual('fr_CA');
				expect(comp.stations[0].style).toEqual('red');
			});
		});

	});
	*/
});
