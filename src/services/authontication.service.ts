import { Injectable  } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterRequest } from 'src/models/registerRequest.model';
import { UserService } from './user.service';
import { LogInRequest } from 'src/models/logInRequest';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private errors: string[];

    constructor(private http: HttpClient, private userService: UserService) {}

    rootUrl = 'https://localhost:44318/api';

    register(register: RegisterRequest) {
        const sorceUrl = this.rootUrl + '/register';
        const httpOptions = {
            headers: new HttpHeaders()
        };
        httpOptions.headers.append('Access-Control-Allow-Origin', '*');
        httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        this.http.post(sorceUrl, register, httpOptions).subscribe((aouthSucsess: AuothSucsess) => {
            this.errors = null;
            if (aouthSucsess != null) {
                this.userService.setUser(aouthSucsess.token);
            }
        }, (failed) => {
                this.errors = failed.error.errors;
            });
    }

    getErrors(): Array<string> {
        return this.errors.slice();
    }

    LogIn(logInRequest: LogInRequest) {
        const sorceUrl = this.rootUrl + '/login';
        const httpOptions = {
            headers: new HttpHeaders()
        };
        httpOptions.headers.append('Access-Control-Allow-Origin', '*');
        httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        this.http.post(sorceUrl, logInRequest, httpOptions).subscribe((aouthSucsess: AuothSucsess) => {
            this.errors = null;
            this.userService.setUser(aouthSucsess.token);
            localStorage.setItem('token', aouthSucsess.token);
        }, (failed) => {
                console.log('error');
                this.errors = failed.error.errors;
                console.log(this.errors);
            });
    }

}

class AuothSucsess {
    token: string;
}
