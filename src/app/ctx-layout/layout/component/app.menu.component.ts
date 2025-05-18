import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { AppMenuitem } from './app.menuitem.component';
import { AuthService } from '../../../api/auth';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, ButtonModule],
    template: `<ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
        @if (isLoggedIn) {
            <p-button [style]="{ width: '100%' }" label="Logout" icon="pi pi-sign-out" (onClick)="onClickLogout()" pRipple />
        } @else {
            <p-button class="auth-button" [style]="{ width: '45%' }" label="Signup" icon="pi pi-user-plus" (onClick)="onClickSignup()" pRipple />
            <p-button [style]="{ width: '45%' }" label="Login" icon="pi pi-sign-in" (onClick)="onClickLogin()" pRipple />
        } `
})
export class AppMenu {
    model: MenuItem[] = [];

    get isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.carregarItensMenu();
    }

    carregarItensMenu(): void {
        this.model = [];

        const itemsDashboard = this.getDashboardItems();
        if (itemsDashboard.length > 0) {
            this.model.push({ label: 'Dashboard', items: itemsDashboard });
        }

        const itemsFaculdade = this.getFaculdadeItems();
        if (itemsFaculdade.length > 0) {
            this.model.push({ label: 'Faculdade', items: itemsFaculdade });
        }
    }

    private getDashboardItems(): MenuItem[] {
        let items: MenuItem[] = [];

        if (this.auth.isLoggedIn()) {
            items.push({ label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] });
            items.push({ label: 'Professor', icon: 'pi pi-fw pi-home', routerLink: ['dashboards/professor'] });
        }

        return items;
    }

    private getFaculdadeItems(): MenuItem[] {
        let items: MenuItem[] = [];

        if (this.auth.isLoggedIn()) {
            items.push({ label: 'Questions', icon: 'pi pi-fw pi-file-edit', routerLink: ['faculdades/questions'] });
        }

        if (this.auth.isLoggedIn()) {
            items.push({ label: 'Lists', icon: 'pi pi-fw pi-list', routerLink: ['faculdades/lists'] });
        }

        return items;
    }

    protected onClickSignup(): void {
        this.router.navigateByUrl('/sign-up');
    }

    protected onClickLogin(): void {
        this.router.navigateByUrl('/login');
    }

    protected onClickLogout(): void {
        this.auth.logout();
        this.carregarItensMenu();
    }
}
