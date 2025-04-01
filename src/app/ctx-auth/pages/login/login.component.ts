import {Component, OnInit} from '@angular/core';

import {LayoutService} from '../../../ctx-layout/layout/service/layout.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth-login',
    templateUrl: 'login.component.html',
    standalone: false
})

export class LoginComponent implements OnInit {
    constructor(public layoutService: LayoutService,
        private router: Router) { }

    ngOnInit(): void { }

    onClickLogin(): void {
        this.router.navigate(['/'])
    }

    verificarTemaEscuro(): boolean {
        return this.layoutService.isDarkTheme() ?? false;
    }
}