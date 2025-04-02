import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LayoutService} from '../../../ctx-layout/layout/service/layout.service';

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