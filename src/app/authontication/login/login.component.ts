import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authontication.service';
import { LogInRequest } from 'src/models/logInRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authentication = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  formInvalid = false;

  constructor(private aouhtenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  LogIn() {
    if (this.authentication.invalid) {
      this.formInvalid = true;
      // tslint:disable-next-line: forin
      for (const control in this.authentication.controls) {
          const currentControl = this.authentication.get(control);
          currentControl.reset();
      }
    } else {
      const jsonData = new Map<string, string>();
      // tslint:disable-next-line: forin
      for (const control in this.authentication.controls) {
        jsonData.set(control, this.authentication.get(control).value);
      }
      const obj = [...jsonData].reduce((o, [key, value]) => (o[key] = value, o), {});
      console.log(obj);

      const logIn = obj as LogInRequest;
      this.aouhtenticationService.LogIn(logIn);
    }
  }

}
