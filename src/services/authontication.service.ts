import { Injectable  } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterRequest } from 'src/models/registerRequest.model';
import { UserService } from './user.service';
import { LogInRequest } from 'src/models/logInRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { JsonPipe } from '@angular/common';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private errors: string[];
    // private jwt: JwtHelperService;

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
            localStorage.setItem('refresh token', aouthSucsess.refreshToken);
        }, (failed) => {
                console.log('error');
                this.errors = failed.error.errors;
                console.log(failed);
            });
    }

    async replaceToken() {
        const sourceUrl = this.rootUrl + '/refresh';
        const httpOptions = {
            headers: new HttpHeaders()
        };
        httpOptions.headers.append('Access-Control-Allow-Origin', '*');
        httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        httpOptions.headers.append( 'Authorization' , 'Bearer '+ JSON.parse(JSON.stringify(localStorage.getItem('token'))));
        let request = {
            token: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refresh token')
        };
        request = request as AuothSucsess;
        console.log(request);
        await this.http.post(sourceUrl, request, httpOptions)
            .toPromise()
            .then(
                (aouthSucsess: AuothSucsess) => {
                    localStorage.setItem('token', aouthSucsess.token);
                    localStorage.setItem('refresh token', aouthSucsess.refreshToken);
                    console.log('refreshing');
                    return localStorage.getItem('token');
                },
                (error) => console.log(error)
            );
    }

     getToken() {
        const decoded = jwt_decode(localStorage.getItem('token'));
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        if (date.valueOf() > new Date().valueOf()) {
            console.log('token');
            return localStorage.getItem('token');
        } else {
            // await this.test();
            // return localStorage.getItem('token');
            this.replaceToken();
            return localStorage.getItem('token');
        }
    }

    isTokenExpired(): boolean {
        const decoded = jwt_decode(localStorage.getItem('token'));
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date.valueOf() < new Date().valueOf();
    }

}

class AuothSucsess {
    token: string;
    refreshToken: string;
}
