import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  comparePasswords: ValidatorFn = ((x: FormGroup) => {
    const password = x.get('password').value;
    const conformPassword = x.get('conformPassword').value;
    if (password === conformPassword) {
      return null;
    } else {
      return {passwordDoNotMatch : true};
    }
  });

  emailInValid = false;

  authentication = new FormGroup({
    // tslint:disable-next-line: max-line-length
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]),
    // tslint:disable-next-line: max-line-length
    password : new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    conformPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  }, this.comparePasswords);

  formSent = false;
  passwordError = false;

  constructor() {  }

  ngOnInit() {
  }

  register() {
    this.formSent = true;
    this.passwordError = false;
    console.log(this.authentication.invalid);
    if (this.authentication.invalid) {
      if (this.authentication.errors != null && this.authentication.errors.passwordDoNotMatch) {
        this.passwordError = true;
      }
      this.authentication.controls.password.reset();
      this.authentication.controls.conformPassword.reset();
    }// else{write the post method}
  }

}
