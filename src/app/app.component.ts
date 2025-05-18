import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './api/auth';

@Component({
    selector: 'app-root',
    standalone: false,
    template: `<app-loading-overlay></app-loading-overlay><app-notification /><router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        this.checkAuthenticatedUser();
    }

    private checkAuthenticatedUser(): void {
        if (this.auth.isLoggedOut()) {
            this.auth.logout();
            this.router.navigateByUrl('/login');
        }
    }
}
