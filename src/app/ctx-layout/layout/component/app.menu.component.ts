import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MenuItem} from 'primeng/api';

import {AppMenuitem} from './app.menuitem.component';

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

    ngOnInit() {
        this.carregarItensMenu();
    }

    carregarItensMenu(): void {
        this.model = [
            {
                label: 'Dashboards',
                items: [
                    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/']},
                    {label: 'Professor', icon: 'pi pi-fw pi-home', routerLink: ['dashboards/professor']}
                ]
            },
            {
                label: 'Faculdade',
                items: [
                    {label: 'Exercicios', icon: 'pi pi-fw pi-file-edit', routerLink: ['faculdades/exercicios']},
                ]
            },
            {
                label: 'Auth',
                items: [
                    {label: 'Login', icon: 'pi pi-fw pi-home', routerLink: ['/login']},
                    {label: 'Sign Up', icon: 'pi pi-fw pi-home', routerLink: ['/sign-up']}
                ]
            },
        ];
    }
}
