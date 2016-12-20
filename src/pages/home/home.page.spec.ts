import { HomePage } from './home.page';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { mockNavController } from 'ionic-angular/util/mock-providers';
import { NavController } from 'ionic-angular';
import { TranslateModule, TranslateService, TranslatePipe } from 'ng2-translate';

describe('Home Page:', () => {

	let comp: HomePage;
	let fixture: ComponentFixture<HomePage>;
	let de: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [HomePage],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: NavController, useValue: mockNavController },
			],
		});
		fixture = TestBed.createComponent(HomePage);
		fixture.detectChanges();
		comp = fixture.componentInstance;
		de = fixture.debugElement;
	});

	describe('.constructor()', () => {
		it('Should be defined', () => {
			expect(comp).toBeDefined();
		});
	});

	it('Barney should be the user', () => {
		expect(comp.user).toEqual({
			name: 'barney',
			age: 36,
			active: true,
		});
	});

	it('Fred should not be the user', () => {
		expect(comp.user).not.toEqual({
			name: 'fred',
			age: 36,
			active: true,
		});
	});
});
