import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'form-error',
	template: 'form-error.html',
})
export class FormErrorComponent {
	@Input() field: FormControl;
	@Input() formSubmitted?: Boolean;
}
