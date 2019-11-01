import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private httpClinet: HttpClient) {}

}


