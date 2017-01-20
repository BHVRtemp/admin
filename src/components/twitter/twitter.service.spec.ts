import { TestBed, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import * as Rx from 'rxjs/Rx';

import { TwitterService } from './twitter.service';
import { Api } from '../../common';

describe('Twitter Service', () => {


	let platformStub;
	let apiStub;

	const configure = () => {
		// init window.twitterCallback
		delete window.twitterCallback;
		delete window.twitterResolve;

		TestBed.configureTestingModule({
			imports: [],
			providers: [
				TwitterService,
				{
					provide: Platform,
					useValue: platformStub,
				},
				{ provide: Api, useValue: apiStub },
			],
		});
	};

	describe('.constructor()', () => {

		beforeEach(() => {
			platformStub = jasmine.createSpyObj('Platform', ['is']);
			platformStub.is.and.returnValue(true);

			configure();
		});

		it('should be defined', inject([TwitterService], (service: TwitterService) => {
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
			inject([TwitterService], (service: TwitterService) => {

				expect(service.isCordova).toBe(false);
			}));

		it('window.twitterCallback should be defined',
			inject([TwitterService], (service: TwitterService) => {

				expect(window.twitterCallback).toBeDefined();
			}));

		describe('.login() success', () => {

			beforeEach(() => {
				platformStub = jasmine.createSpyObj('Platform', ['is']);
				platformStub.is.and.returnValue(false);

				apiStub = jasmine.createSpyObj('Api', ['post']);
				apiStub.post.and.returnValue(Rx.Observable.of({
					json: () => ({ credentials: {} }),
				}));

				configure();
			});

			it('login should work',
				inject([TwitterService], (service: TwitterService) => {

					service.login().subscribe(() => {
						expect(true).toBe(true);
					}, () => {
						expect(false).toBe(true);
					});

				}));


			it('login should set window.twitterResolve',
				inject([TwitterService], (service: TwitterService) => {

					expect(window.twitterResolve).not.toBeDefined();
					service.login().subscribe(() => {
						expect(window.twitterResolve).toBeDefined();
					});

				}));

		});



		describe('.login() failure', () => {

			beforeEach(() => {
				platformStub = jasmine.createSpyObj('Platform', ['is']);
				platformStub.is.and.returnValue(false);

				apiStub = jasmine.createSpyObj('Api', ['post']);
				apiStub.post.and.returnValue(Rx.Observable.throw(new Error()));

				configure();
			});

			it('login should not work',
				inject([TwitterService], (service: TwitterService) => {

					service.login().subscribe(() => {
						expect(false).toBe(true);
					}, () => {
						expect(true).toBe(true);
					});

				}));

		});
	});



	describe('Mobile app', () => {

		beforeEach(() => {
			platformStub = jasmine.createSpyObj('Platform', ['is']);
			platformStub.is.and.returnValue(true);

			configure();
		});

		it('isCordova should be defined with Platform.is("cordova")',
			inject([TwitterService], (service: TwitterService) => {

				expect(service.isCordova).toBe(true);
			}));


		it('window.twitterCallback should not be defined',
			inject([TwitterService], (service: TwitterService) => {

				expect(window.twitterCallback).not.toBeDefined();
			}));


		/*
		it('login should work',
				inject([TwitterService], (service: TwitterService) => {

			service.login().subscribe();
				
			expect(true).toBe(true);
		}));
		*/
	});

});
