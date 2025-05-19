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
    refreshIntervalId: any;

    get url(): string {
        return environment.apiUrl;
    }

    get authUrl(): string {
        return environment.authApiUrl;
    }

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    public login(request: LoginRequest) {
        this.clearSession();
        return this.http.post<any>(`${this.url}/public/users/login`, { ...request }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    public signup(request: SignupRequest) {
        return this.http.post(`${this.url}/public/users/signup`, { ...request }, { responseType: 'text' });
    }

    refreshToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return;

        return this.http.post<any>(`${this.url}/public/users/refresh`, { refreshToken: refreshToken }).pipe(
            map((o) => {
                this.setSession(o);
            })
        );
    }

    private setSession(authResult: any): void {
        const expiresAt = moment().add(authResult.expires_in, 'second');

        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('refresh_token', authResult.refresh_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        this.startTokenRefreshScheduler();
    }

    private clearSession(): void {
        this.stopTokenRefreshScheduler();
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('refresh_token');
    }

    logout() {
        this.clearSession();
        this.router.navigateByUrl('/login');
    }

    public isLoggedIn() {
        const expirationDate = this.getExpiration();
        if (!expirationDate) return false;

        const now = moment();

        return moment(expirationDate).diff(now, 'seconds') > 0;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        if (!expiration) return false;

        const expiresAt = JSON.parse(expiration);

        return moment(expiresAt).toDate();
    }

    getAccessToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    startTokenRefreshScheduler() {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId);
        }

        this.refreshIntervalId = setInterval(() => {
            const expiresAt = this.getExpiration();
            const now = moment();

            if (!expiresAt) return;
            const timeLeft = moment(expiresAt).diff(now, 'seconds');

            if (timeLeft < 60 && timeLeft > 0) {
                this.refreshToken()?.subscribe();
            }

            if (timeLeft <= 0) {
                this.logout();
            }
        }, 30 * 1000);
    }

    stopTokenRefreshScheduler() {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId);
            this.refreshIntervalId = null;
        }
    }
}
