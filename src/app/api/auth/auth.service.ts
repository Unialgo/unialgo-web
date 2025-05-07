import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import moment from 'moment';

import { LoginRequest } from '.';
import { environment } from '../../../environments/environment';
import { SignupRequest } from './requests/signup-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
    get url(): string {
        return environment.apiUrl;
    }

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    public login(request: LoginRequest) {
        return this.http.post<any>(`${this.url}/public/users/login`, { ...request }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    public signup(request: SignupRequest) {
        return this.http.post<any>(`${this.url}/public/users/signup`, { ...request })
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        this.router.navigateByUrl('/login');
    }

    public isLoggedIn() {
        const expirationDate = this.getExpiration();
        if (expirationDate == null) return false;
        else return true

        // TODO: Esta voltando data do login no expires_at

        // return moment().diff(expirationDate.toDate(), 'hour') > 0;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        if (!expiration) return null;

        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
