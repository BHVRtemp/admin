import { NgZone } from '@angular/core';
import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import {
	BaseRequestOptions,
	HttpModule,
	Http,
	Response,
	ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

import { UserService } from './user.service';
import { Api } from '../api/api';

describe('User Service', () => {

	const initialUser = 'user1';
	const initialToken = 'jwtT_';
	const otherUser = 'user2';
	const otherToken = '_jwt';
	let spy;
	let service: UserService;

	beforeEach(() => {

		spy = jasmine.createSpy('spy');

		const storageStub = {
			get: (value) => new Promise((resolve, reject) => {
				if (value === 'user') resolve(initialUser);
				if (value === 'jsonwebtoken') resolve(initialToken);
			}),
			set: spy,
		};

		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				UserService,
				{
					provide: Api,
					useFactory: (mockBackend, options) => {
						return new Api(
							new Http(mockBackend, options),
							new UserService(
								new Storage(),
								new NgZone({ enableLongStackTrace: true }),
							),
						);
					},
					deps: [MockBackend, BaseRequestOptions],
				},
				MockBackend,
				BaseRequestOptions,
				{
					provide: Storage,
					useValue: storageStub,
				},
				{
					provide: NgZone,
					useFactory: () => new NgZone({ enableLongStackTrace: true }),
				},
			],
		});

	});

	beforeEach(fakeAsync(inject([UserService], (userService: UserService) => {
		service = userService;
		tick();
	})));

	describe('.constructor()', () => {

		it('should be defined', () => {
			expect(service).toBeDefined();
		});

		it('user should be defined at start with the one in storage', () => {
			expect(service.user).toBe(initialUser);
		});

		it('token should be defined at start with the one in storage', () => {
			expect(service.token).toBe(initialToken);
		});

	});

	describe('.logout()', () => {

		it('should remove user and token from service && storage', () => {
			service.user = otherUser;
			service.token = otherToken;
			service.logout();

			expect(service.user).toBe(null);
			expect(service.token).toBe(null);
		});

	});

	describe('set user', () => {
		it('should set user into storage', () => {
			service.user = otherUser;
			expect(spy).toHaveBeenCalledWith('user', otherUser);
		});
	});

	describe('set token', () => {
		it('should set token into storage', () => {
			service.token = otherToken;
			expect(spy).toHaveBeenCalledWith('jsonwebtoken', otherToken);
		});
	});


	describe('.loggedIn()', () => {
		it('should set user and token', () => {
			service.loggedIn({ user: otherUser, token: otherToken });
			expect(service.user).toBe(otherUser);
			expect(service.token).toBe(otherToken);
		});
	});

});
