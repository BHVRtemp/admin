import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'form-error',
	templateUrl: 'form-error.html',
})
export class FormErrorComponent {
	@Input() field: FormControl;
	@Input() formSubmitted?: Boolean;
}
