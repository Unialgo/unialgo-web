import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { AppMenuitem } from './app.menuitem.component';
import { AuthService } from '../../../api/auth';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(private auth: AuthService) {}

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

        const itemsAuth = this.getAuthItems();
        if (itemsAuth.length > 0) {
            this.model.push({ label: 'Auth', items: itemsAuth });
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
            items.push({ label: 'Exercicios', icon: 'pi pi-fw pi-file-edit', routerLink: ['faculdades/exercicios'] });
        }

        if (this.auth.isLoggedIn()) {
            items.push({ label: 'Lists', icon: 'pi pi-fw pi-list', routerLink: ['faculdades/lists'] });
        }

        return items;
    }

    private getAuthItems(): MenuItem[] {
        let items: MenuItem[] = [];

        if (this.auth.isLoggedOut()) {
            items.push({ label: 'Login', icon: 'pi pi-fw pi-home', routerLink: ['/login'] });
            items.push({ label: 'Sign Up', icon: 'pi pi-fw pi-home', routerLink: ['/sign-up'] });
        }

        if (this.auth.isLoggedIn()) {
            items.push({ label: 'Logout', icon: 'pi pi-fw pi-home', command: () => this.auth.logout() });
        }

        return items;
    }
}
