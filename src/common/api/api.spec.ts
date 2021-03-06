import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import {
	BaseRequestOptions,
	HttpModule,
	Http,
	Response,
	ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TranslateModule } from 'ng2-translate';

import { Api } from './api';
import { UserService } from '../user/user.service';
import { Environnement } from '../../env/main';
import { LoginComponent } from '../user/login/login.component';
import { LoginPage } from '../../pages/login/login.page';

describe('Api Service', () => {
	

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [HttpModule, TranslateModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [LoginPage],
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
				{
					provide: Environnement,
					useValue: { url: 'urltest' },
				},
			],
		});

	});

	it('should be defined', inject([Api], (service) => {
		expect(service).toBeDefined();
	}));

	it('url should be defined to url provided by environnement', inject([Api], (service) => {
		expect(service.url).toBe('urltest');
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
