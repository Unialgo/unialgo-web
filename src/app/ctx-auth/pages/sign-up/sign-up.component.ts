import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LayoutService} from '../../../ctx-layout/layout/service/layout.service';

@Component({
    selector: 'app-auth-sign-up',
    templateUrl: 'sign-up.component.html',
    standalone: false
})

export class SignUpComponent implements OnInit {
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