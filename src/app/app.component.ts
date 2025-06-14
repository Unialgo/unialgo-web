import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './api/auth';

@Component({
    selector: 'app-root',
    standalone: false,
    template: `<app-loading-overlay></app-loading-overlay><app-notification /><router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.checkAuthenticatedUser();
    }

    private checkAuthenticatedUser(): void {
        if (this.auth.isLoggedIn()) {
            this.auth.startTokenRefreshScheduler();
            this.auth.refreshToken();
        }
    }
}
