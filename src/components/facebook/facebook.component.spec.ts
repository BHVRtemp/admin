import { FacebookComponent } from './facebook.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import * as Rx from 'rxjs/Rx';

import { Api, UserService } from '../../common';
import { FacebookService } from './facebook.service';
// import { UserServiceStub } from './user.service.mock';

describe('Facebook Component:', () => {

	let comp: FacebookComponent;
	let fixture: ComponentFixture<FacebookComponent>;
	let de: DebugElement;

	let facebookServiceStub;
	let userServiceStub;
	let apiStub;
	const facebookResponse = { authResponse: 'a' };
	const apiResponse = { user: 'a', token: 'b' };

	const configure = () => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [FacebookComponent],
			imports: [

			],
			providers: [
				{ provide: FacebookService, useValue: facebookServiceStub },
				{ provide: Api, useValue: apiStub },
				{ provide: UserService, useValue: userServiceStub },
			],
		});
		fixture = TestBed.createComponent(FacebookComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	};

	describe('.constructor()', () => {
		beforeEach(() => {

			facebookServiceStub = {};
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

			facebookServiceStub = jasmine.createSpyObj('FacebookService', ['login']);
			facebookServiceStub.login.and.returnValue(Rx.Observable.of(facebookResponse));

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

		it('should call FacebookService.login with email parameter', () => {
			comp.login().subscribe(() => {
				expect(facebookServiceStub.login).toHaveBeenCalledWith(['email']);
			});
		});

		it('should call Api.post to /facebook-login with authResponse', () => {
			comp.login().subscribe(() => {
				expect(apiStub.post).toHaveBeenCalledWith('/facebook-login', facebookResponse.authResponse);
			});
		});

		it('should call FacebookService.login with email parameter', () => {
			comp.login().subscribe(() => {
				expect(userServiceStub.loggedIn).toHaveBeenCalledWith(apiResponse);
			});
		});

	});

	describe('.login() failure (facebook login)', () => {
		beforeEach(() => {

			facebookServiceStub = jasmine.createSpyObj('FacebookService', ['login']);
			facebookServiceStub.login.and.returnValue(Rx.Observable.throw(new Error()));

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

			facebookServiceStub = jasmine.createSpyObj('FacebookService', ['login']);
			facebookServiceStub.login.and.returnValue(Rx.Observable.of(facebookResponse));

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


		it('should call Api.post to /facebook-login with authResponse', () => {
			comp.login().subscribe(() => {}, () => {
				expect(apiStub.post).toHaveBeenCalledWith('/facebook-login', facebookResponse.authResponse);
			});
		});

		it('should not call call UserService.loggedIn', () => {
			comp.login().subscribe(() => {}, () => {
				expect(userServiceStub.loggedIn).not.toHaveBeenCalled();
			});
		});

	});

	

});
