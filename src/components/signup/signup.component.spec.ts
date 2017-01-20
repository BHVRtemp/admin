import { SignupComponent } from './signup.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { ToastController } from 'ionic-angular';
import * as Rx from 'rxjs/Rx';

import { Api } from '../../common';
// import { TwitterService } from './twitter.service';
// import { UserServiceStub } from './user.service.mock';

describe('Signup Component:', () => {

	let comp: SignupComponent;
	let fixture: ComponentFixture<SignupComponent>;
	let de: DebugElement;

	let apiStub;
	const apiResponse = { status: 1 };
	const validUser = {
		email: 'theo.mathieu1@gmail.com',
		firstName: 'Théo',
		lastName: 'Mathieu',
		password: 'aaaa',
		password2: 'aaaa',
	};

	const updateForm = user => {
		comp.form.controls['firstName'].setValue(user.firstName);
		comp.form.controls['lastName'].setValue(user.lastName);
		comp.form.controls['email'].setValue(user.email);
		comp.form.controls['password'].setValue(user.password);
		comp.form.controls['password2'].setValue(user.password2);
	};
	const updateField = (field, value) => {
		comp.form.controls[field].setValue(value);
	};

	const configure = () => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [SignupComponent],
			imports: [ReactiveFormsModule, TranslateModule.forRoot()],
			providers: [
				{ provide: Api, useValue: apiStub },
			],
		});
		fixture = TestBed.createComponent(SignupComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	};

	describe('component and form validity', () => {
		beforeEach(() => {
			apiStub = {};

			configure();
		});

		it('should be defined', () => {
			expect(comp).toBeDefined();
		});

		it('submitted should be inited to false', () => {
			expect(comp.submitted).toBe(false);
		});

		it('should have default fields empty', () => {
			expect(comp.form.value).toEqual({ email: '', firstName: '', lastName: '', password: '', password2: '' });
		});

		it('form value should update from form changes', () => {
			updateForm(validUser);
			expect(comp.form.value).toEqual(validUser);
		});

		it('form should be valid with valid user', () => {
			updateForm(validUser);
			expect(comp.form.valid).toBe(true);
		});

		it('form validity should be false when email is invalid', () => {
			updateForm(validUser);
			updateField('email', 'theo.mathie');
			expect(comp.form.valid).toBe(false);
			expect(comp.email.valid).toBe(false);
			updateField('email', '');
			expect(comp.form.valid).toBe(false);
			expect(comp.email.valid).toBe(false);
		});

		it('form validity should be false when firstName is invalid', () => {
			updateForm(validUser);
			updateField('firstName', '');
			expect(comp.form.valid).toBe(false);
			expect(comp.firstName.valid).toBe(false);
		});


		it('form validity should be false when lastName is invalid', () => {
			updateForm(validUser);
			updateField('lastName', '');
			expect(comp.form.valid).toBe(false);
			expect(comp.lastName.valid).toBe(false);
		});


		it('form validity should be false when password is invalid', () => {
			updateForm(validUser);
			updateField('password', '');
			expect(comp.form.valid).toBe(false);
			expect(comp.password.valid).toBe(false);
			updateField('password', 'aaa');
			expect(comp.form.valid).toBe(false);
			expect(comp.password.valid).toBe(false);
		});



		it('form validity should be false when password2 is invalid', () => {
			updateForm(validUser);
			updateField('password', 'aaaaa');
			updateField('password2', 'aaaab');
			expect(comp.form.valid).toBe(false);
			expect(comp.password2.valid).toBe(false);
		});
	});

	describe('submit()', () => {
		beforeEach(() => {
			apiStub = jasmine.createSpyObj('Api', ['post']);
			apiStub.post.and.returnValue(Rx.Observable.of({
				json: () => apiResponse,
			}));
			configure();
		});

		it('should return undefined and not call api if form is invalid', () => {
			updateForm(validUser);
			updateField('password', '');
			
			const result = comp.submit();
			expect(result).not.toBeDefined();
			expect(apiStub.post).not.toHaveBeenCalled();

		});



		it('should return the sub and call api if form is valid', () => {
			updateForm(validUser);
			
			const result = comp.submit();
			expect(result).toBeDefined();

			result.subscribe(() => {
				expect(apiStub.post).toHaveBeenCalledWith('/user', validUser);
			});

		});

		it('should set submitted to true if form is valid', () => {
			updateForm(validUser);
			comp.submit();
			expect(comp.submitted).toBe(true);
		});


		it('should set submitted to true if form is not valid', () => {
			updateForm(validUser);
			updateField('password', '');
			comp.submit();
			expect(comp.submitted).toBe(true);
		});
	});

});
