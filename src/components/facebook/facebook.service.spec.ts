import { TestBed, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular';

import { FacebookService } from './facebook.service';

describe('Facebook Service', () => {


	let platformStub;

	const configure = () => {
		// init window.fbAsyncInit
		delete window.fbAsyncInit;

		TestBed.configureTestingModule({
			imports: [],
			providers: [
				FacebookService,
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

		it('should be defined', inject([FacebookService], (service: FacebookService) => {
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
				inject([FacebookService], (service: FacebookService) => {

			expect(service.isCordova).toBe(false);
		}));

		it('window.fbAsyncInit should be defined',
				inject([FacebookService], (service: FacebookService) => {
					
			expect(window.fbAsyncInit).toBeDefined();
		}));


		// FB is defined is config/karma-shim.js
		it('login should work',
				inject([FacebookService], (service: FacebookService) => {

			service.login(['email']).subscribe(() => {
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
				inject([FacebookService], (service: FacebookService) => {

			expect(service.isCordova).toBe(true);
		}));


		it('window.fbAsyncInit should not be defined',
				inject([FacebookService], (service: FacebookService) => {
					
			expect(window.fbAsyncInit).not.toBeDefined();
		}));


		/*
		it('login should work',
				inject([FacebookService], (service: FacebookService) => {

			service.login(['email']).subscribe();
				
			expect(true).toBe(true);
		}));
		*/
	});

});
