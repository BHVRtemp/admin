import { Component, Output, Input, EventEmitter} from '@angular/core';
import {MdDialog,MdDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	 
	templateUrl: 'stations-dialog.html',
})
 
export class StationsDialogComponent {
  
  //Validation
    name: FormControl = new FormControl('', [Validators.required]);
    language: FormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
    domain: FormControl = new FormControl('', [Validators.required]);
    style: FormControl = new FormControl('', [Validators.required]);
    theme: FormControl = new FormControl('', [Validators.required]);
	submitted: Boolean = false;
	error: string;
    
    form: FormGroup = this.formBuilder.group({
		name: this.name,
		domain: this.domain,
        language: this.language,
        style: this.style,
        theme: this.theme,
	}); 

  //Themes and Styles to be added to the two Select Input Fields dynamically
  themes=[
            {value: 'sidebar_menu',       viewValue:'Sidebar Menu' },
            {value: 'no_sidebar_menu',    viewValue:'No Sidebar Menu' },
            {value: 'no_sidebar_no_menu', viewValue:'No Sidebar No Menu' },
            {value: 'sidebar_no_menu',    viewValue:'Sidebar No Menu' }
  ];
  styles=[
            {value: 'red',    viewValue:'Red' },
            {value: 'blue',   viewValue:'Blue' },
            {value: 'green',  viewValue:'Green' },
            {value: 'purple', viewValue:'Purple' },
            {value: 'orange', viewValue:'Orange' },
            {value: 'yellow', viewValue:'Yellow' },
            {value: 'black',  viewValue:'Black' },
            {value: 'white',  viewValue:'White' }
  ];
  constructor(public dialogRef: MdDialogRef<StationsDialogComponent>,private formBuilder: FormBuilder) {}
  //Adding the new Station to database
  addStation(){

  }
  submit() {
		this.submitted = true;
		this.error = null;
		if (!this.form.valid) return;
 }
}	

 