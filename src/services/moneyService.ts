import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
// import {RequestOptions} from '@angular/http';
import { UserService } from './user.service';
import { MoneyRequest } from 'src/models/addRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './authontication.service';

@Injectable({providedIn: 'root'})
export class MoneyService {
    private rootUrl = 'https://localhost:44318/api';
    private moneyArray: MoneyRequest[];
    public addedNew = new EventEmitter<MoneyRequest>();

    constructor(private userService: UserService, private http: HttpClient, private auothService: AuthenticationService) {}
    jwt = new JwtHelperService();
    addNew(addRequesr: MoneyRequest) {
        const sourceUrl = this.rootUrl + '/MoneyDetale';
        const test = 'Bearer '  + localStorage.getItem('token');
        const aheaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'https://localhost:44318',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
            'Access-Control-Allow-Headers' : 'True',
            'Access-Control-Allow-Credentials' : 'True',
            'Authorization' : 'Bearer '+ JSON.parse(JSON.stringify(localStorage.getItem('token')))
        });
        const a = {headers: aheaders , withCredentials: true};
        // tslint:disable-next-line: radix
        addRequesr.amount = parseInt(addRequesr.amount.toString());
        addRequesr.isIncome = String(addRequesr.isIncome) === 'true' ? true : false;
        this.http.post<MoneyRequest>(sourceUrl, addRequesr, a) //, addRequesr,{headers}
        .subscribe((data) => {
            console.log('success');
            this.addedNew.emit(data);
        },
        (err) => {console.log(err)} );
    }

    getMonth(month? :Number) {
        this.moneyArray = null;
        const sourceUrl = this.rootUrl + '/MoneyDetale';
        const test = 'Bearer '  + localStorage.getItem('token');
        const aheaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'https://localhost:44318',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
            'Access-Control-Allow-Headers' : 'True',
            'Access-Control-Allow-Credentials' : 'True',
            'Authorization' : 'Bearer ' + this.auothService.getToken()
        });
        const a = {headers: aheaders , withCredentials: true};
        this.http.get<MoneyRequest[]>(sourceUrl, a).subscribe((data: MoneyRequest[]) => {
            console.log('hh');
            this.moneyArray = data;
        });
    }

    getMoneyArray() {
        return this.moneyArray != null ? this.moneyArray.slice() : null;
    }

    deleteLine(addRequesr: MoneyRequest){
        const sourceUrl = this.rootUrl + '/MoneyDetale';
        const test = 'Bearer '  + localStorage.getItem('token');
        const aheaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'https://localhost:44318',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
            'Access-Control-Allow-Headers' : 'True',
            'Access-Control-Allow-Credentials' : 'True',
            'Authorization' : 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
        });
        const a = {headers: aheaders , body: addRequesr};
        // tslint:disable-next-line: radix
        addRequesr.amount = parseInt(addRequesr.amount.toString());
        addRequesr.isIncome = String(addRequesr.isIncome) === 'true' ? true : false;
        this.http.delete(sourceUrl, a).subscribe(() => {
            console.log('sucess');
            this.addedNew.emit();
        },
        (err) => { console.log(err);
        } );
    }
}
