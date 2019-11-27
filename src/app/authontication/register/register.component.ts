import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/services/authontication.service';
import { RegisterRequest } from 'src/models/registerRequest.model';

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
    password : new FormControl('', [Validators.required]),
    conformPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  }, this.comparePasswords);

  formSent = false;
  passwordError = false;

  constructor(private authonticationService: AuthenticationService) {  } // 

  ngOnInit() {
  }

  register() {
    this.formSent = true;
    this.passwordError = false;
    if (this.authentication.invalid) {
      if (this.authentication.errors != null && this.authentication.errors.passwordDoNotMatch) {
        this.passwordError = true;
      }
      this.authentication.controls.password.reset();
      this.authentication.controls.conformPassword.reset();
    } else {
      const jsonData = new Map<string, string>();
      // tslint:disable-next-line: forin
      for (const control in this.authentication.controls) {
        jsonData.set(control, this.authentication.get(control).value);
      }
      const obj = [...jsonData].reduce((o, [key, value]) => (o[key] = value, o), {});

      const register = obj as RegisterRequest;
      this.authonticationService.register(register);
    }
  }

}
