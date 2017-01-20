import { TwitterComponent } from './twitter.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import * as Rx from 'rxjs/Rx';

import { Api, UserService } from '../../common';
import { TwitterService } from './twitter.service';
// import { UserServiceStub } from './user.service.mock';

describe('Twitter Component:', () => {

	let comp: TwitterComponent;
	let fixture: ComponentFixture<TwitterComponent>;
	let de: DebugElement;

	let twitterServiceStub;
	let userServiceStub;
	let apiStub;
	const twitterResponse = { authResponse: 'a' };
	const apiResponse = { user: 'a', token: 'b' };

	const configure = () => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [TwitterComponent],
			providers: [
				{ provide: TwitterService, useValue: twitterServiceStub },
				{ provide: Api, useValue: apiStub },
				{ provide: UserService, useValue: userServiceStub },
			],
		});
		fixture = TestBed.createComponent(TwitterComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	};

	describe('.constructor()', () => {
		beforeEach(() => {

			twitterServiceStub = {};
			apiStub = {};
			userServiceStub = {};

			configure();
		});

		it('Should be defined', () => {
			expect(comp).toBeDefined();
		});
	});

	describe('.login() success', () => {
		beforeEach(() => {

			twitterServiceStub = jasmine.createSpyObj('TwitterService', ['login']);
			twitterServiceStub.login.and.returnValue(Rx.Observable.of(twitterResponse));

			apiStub = jasmine.createSpyObj('Api', ['post']);
			apiStub.post.and.returnValue(Rx.Observable.of({
				json: () => apiResponse,
			}));

			userServiceStub = jasmine.createSpyObj('UserService', ['loggedIn']);

			configure();
		});

		it('should not call onError', () => {
			comp.login().subscribe(() => {
				expect(true).toBe(true);
			}, () => {
				expect(false).toBe(true);
			});
		});

		it('should call TwitterService.login with email parameter', () => {
			comp.login().subscribe(() => {
				expect(twitterServiceStub.login).toHaveBeenCalledWith();
			});
		});

		it('should call Api.post to /twitter-login with the response', () => {
			comp.login().subscribe(() => {
				expect(apiStub.post).toHaveBeenCalledWith('/twitter-login', twitterResponse);
			});
		});

		it('should call TwitterService.login with email parameter', () => {
			comp.login().subscribe(() => {
				expect(userServiceStub.loggedIn).toHaveBeenCalledWith(apiResponse);
			});
		});

	});

	describe('.login() failure (twitter login)', () => {
		beforeEach(() => {

			twitterServiceStub = jasmine.createSpyObj('TwitterService', ['login']);
			twitterServiceStub.login.and.returnValue(Rx.Observable.throw(new Error()));

			apiStub = jasmine.createSpyObj('Api', ['post']);
			apiStub.post.and.returnValue(Rx.Observable.of({
				json: () => apiResponse,
			}));

			userServiceStub = jasmine.createSpyObj('UserService', ['loggedIn']);

			configure();
		});


		it('should not call onNext but call onError', () => {
			comp.login().subscribe(() => {
				expect(true).toBe(false);
			}, () => {
				expect(true).toBe(true);
			});
		});

		it('should not call call Api.post', () => {
			comp.login().subscribe(() => {}, () => {
				expect(apiStub.post).not.toHaveBeenCalled();
			});
		});

	});

	

	describe('.login() failure (api login)', () => {
		beforeEach(() => {

			twitterServiceStub = jasmine.createSpyObj('TwitterService', ['login']);
			twitterServiceStub.login.and.returnValue(Rx.Observable.of(twitterResponse));

			apiStub = jasmine.createSpyObj('Api', ['post']);
			apiStub.post.and.returnValue(Rx.Observable.throw(new Error()));

			userServiceStub = jasmine.createSpyObj('UserService', ['loggedIn']);

			configure();
		});


		it('should not call onNext but call onError', () => {
			comp.login().subscribe(() => {
				expect(true).toBe(false);
			}, () => {
				expect(true).toBe(true);
			});
		});


		it('should call Api.post to /twitter-login with the response', () => {
			comp.login().subscribe(() => {}, () => {
				expect(apiStub.post).toHaveBeenCalledWith('/twitter-login', twitterResponse);
			});
		});

		it('should not call call UserService.loggedIn', () => {
			comp.login().subscribe(() => {}, () => {
				expect(userServiceStub.loggedIn).not.toHaveBeenCalled();
			});
		});

	});

	

});
