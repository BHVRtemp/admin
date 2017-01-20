import { FormGroup, FormControl } from '@angular/forms';

export class GlobalValidator {

	static areEqual(passwordKey: string, passwordConfirmationKey: string) {

		return (group: FormGroup): void => {
			const password = group.controls[passwordKey];
			const passwordConfirm = group.controls[passwordConfirmationKey];
			
			if (password.value !== passwordConfirm.value) {
				return passwordConfirm.setErrors({ areEqual: true });
			} else {
				return passwordConfirm.setErrors(null);
			}
		};

	}

	static isEmail(control: FormControl) {
		// tslint:disable-next-line
		const EMAIL_REGEXP =/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

		if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
			return { email: true };
		}

		return null;
	}

}

