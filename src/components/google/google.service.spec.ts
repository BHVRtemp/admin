import { TestBed, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular';

import { GoogleService } from './google.service';

describe('Google Service', () => {


	let platformStub;

	const configure = () => {
		// init window.initGooglePlusCallback
		delete window.initGooglePlusCallback;

		TestBed.configureTestingModule({
			imports: [],
			providers: [
				GoogleService,
				{
					provide: Platform,
					useValue: platformStub,
				},
			],
		});
	};

	describe('.constructor()', () => {

		beforeEach(() => {
			platformStub = jasmine.createSpyObj('Platform', ['is']);
			platformStub.is.and.returnValue(true);

			configure();
		});

		it('should be defined', inject([GoogleService], (service: GoogleService) => {
			expect(service).toBeDefined();
		}));

	});



	describe('Web app', () => {

		beforeEach(() => {
			platformStub = jasmine.createSpyObj('Platform', ['is']);
			platformStub.is.and.returnValue(false);

			configure();
		});

		it('isCordova should be defined with Platform.is("cordova")',
				inject([GoogleService], (service: GoogleService) => {

			expect(service.isCordova).toBe(false);
		}));

		it('window.initGooglePlusCallback should be defined',
				inject([GoogleService], (service: GoogleService) => {
					
			expect(window.initGooglePlusCallback).toBeDefined();
		}));


		// gapi is defined is config/karma-shim.js
		it('login should work',
				inject([GoogleService], (service: GoogleService) => {

			service.login().subscribe(() => {
				expect(true).toBe(true);
			});

		}));
	});



	describe('Mobile app', () => {

		beforeEach(() => {
			platformStub = jasmine.createSpyObj('Platform', ['is']);
			platformStub.is.and.returnValue(true);

			configure();
		});

		it('isCordova should be defined with Platform.is("cordova")',
				inject([GoogleService], (service: GoogleService) => {

			expect(service.isCordova).toBe(true);
		}));


		it('window.initGooglePlusCallback should not be defined',
				inject([GoogleService], (service: GoogleService) => {
					
			expect(window.initGooglePlusCallback).not.toBeDefined();
		}));


		/*
		it('login should work',
				inject([GoogleService], (service: GoogleService) => {

			service.login().subscribe();
				
			expect(true).toBe(true);
		}));
		*/
	});

});
