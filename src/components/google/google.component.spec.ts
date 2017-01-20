import { GoogleComponent } from './google.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import * as Rx from 'rxjs/Rx';

import { Api, UserService } from '../../common';
import { GoogleService } from './google.service';
// import { UserServiceStub } from './user.service.mock';

describe('Google Component:', () => {

	let comp: GoogleComponent;
	let fixture: ComponentFixture<GoogleComponent>;
	let de: DebugElement;

	let googleServiceStub;
	let userServiceStub;
	let apiStub;
	const googleResponse = { authResponse: 'a' };
	const apiResponse = { user: 'a', token: 'b' };

	const configure = () => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [GoogleComponent],
			imports: [

			],
			providers: [
				{ provide: GoogleService, useValue: googleServiceStub },
				{ provide: Api, useValue: apiStub },
				{ provide: UserService, useValue: userServiceStub },
			],
		});
		fixture = TestBed.createComponent(GoogleComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	};

	describe('.constructor()', () => {
		beforeEach(() => {

			googleServiceStub = {};
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

			googleServiceStub = jasmine.createSpyObj('GoogleService', ['login']);
			googleServiceStub.login.and.returnValue(Rx.Observable.of(googleResponse));

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

		it('should call GoogleService.login with email parameter', () => {
			comp.login().subscribe(() => {
				expect(googleServiceStub.login).toHaveBeenCalledWith();
			});
		});

		it('should call Api.post to /google-login with the response', () => {
			comp.login().subscribe(() => {
				expect(apiStub.post).toHaveBeenCalledWith('/google-login', googleResponse);
			});
		});

		it('should call GoogleService.login with email parameter', () => {
			comp.login().subscribe(() => {
				expect(userServiceStub.loggedIn).toHaveBeenCalledWith(apiResponse);
			});
		});

	});

	describe('.login() failure (google login)', () => {
		beforeEach(() => {

			googleServiceStub = jasmine.createSpyObj('GoogleService', ['login']);
			googleServiceStub.login.and.returnValue(Rx.Observable.throw(new Error()));

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

			googleServiceStub = jasmine.createSpyObj('GoogleService', ['login']);
			googleServiceStub.login.and.returnValue(Rx.Observable.of(googleResponse));

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


		it('should call Api.post to /google-login with the response', () => {
			comp.login().subscribe(() => {}, () => {
				expect(apiStub.post).toHaveBeenCalledWith('/google-login', googleResponse);
			});
		});

		it('should not call call UserService.loggedIn', () => {
			comp.login().subscribe(() => {}, () => {
				expect(userServiceStub.loggedIn).not.toHaveBeenCalled();
			});
		});

	});

	

});
