import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
    // tslint:disable-next-line: no-use-before-declare
    private user: User = new User();

    constructor() {
    }

    setUser(userToken: string) {
        this.user.token = userToken;
        console.log(this.user.token);
    }

    getUser() {
        return this.user;
    }
}

class User {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}
