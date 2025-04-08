import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import moment from 'moment';

import { LoginRequest } from '.';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    public login(request: LoginRequest) {
        return this.http.post<any>('http://localhost:8180/login', { ...request }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at') ?? '';
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
