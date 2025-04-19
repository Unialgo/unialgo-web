import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, LoginRequest } from '../../../api/auth';
import { LayoutService } from '../../../ctx-layout/layout/service/layout.service';

@Component({
    selector: 'app-auth-login',
    templateUrl: 'login.component.html',
    standalone: false
})
export class LoginComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public layoutService: LayoutService,
        private router: Router
    ) {
        this.criarFormulario();
    }

    ngOnInit(): void {}

    verificarTemaEscuro(): boolean {
        return this.layoutService.isDarkTheme() ?? false;
    }

    onClickLogin(): void {
        const request: LoginRequest = {
            username: this.form.value.email,
            password: this.form.value.password
        };

        if (request) {
            this.authService.login(request).subscribe(() => {
                this.router.navigateByUrl('/');
            });
        }
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        });
    }
}
