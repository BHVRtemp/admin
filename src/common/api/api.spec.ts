import { TestBed, async, inject } from '@angular/core/testing';
import {
	BaseRequestOptions,
	HttpModule,
	Http,
	Response,
	ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Platform } from 'ionic-angular';

import { Api } from './api';
import { UserService } from '../user/user.service';

describe('Api Service', () => {

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				Api,
				{
					provide: Http,
					useFactory: (mockBackend, options) => {
						return new Http(mockBackend, options);
					},
					deps: [MockBackend, BaseRequestOptions],
				},
				MockBackend,
				BaseRequestOptions,
				{
					provide: UserService,
					useValue: { token: 'a' },
				},
			],
		});

	});

	it('should be defined', inject([Api], (service) => {
		expect(service).toBeDefined();
	}));

	it('url should be defined', inject([Api], (service) => {
		expect(service.url).toBeDefined();
	}));

	it('should contain a get method', inject([Api], (service) => {
		expect(service.get).toBeDefined();
	}));

	it('should contain a post method', inject([Api], (service) => {
		expect(service.post).toBeDefined();
	}));

	it('should contain a put method', inject([Api], (service) => {
		expect(service.put).toBeDefined();
	}));

	it('should contain a patch method', inject([Api], (service) => {
		expect(service.patch).toBeDefined();
	}));

	it('should contain a delete method', inject([Api], (service) => {
		expect(service.delete).toBeDefined();
	}));

});
