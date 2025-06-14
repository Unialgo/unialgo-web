import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../api/auth';
import { ReactiveFormAbstract } from '../../../libraries/abstracts';
import { SignupRequest } from '../../../api/auth/requests/signup-request';
import { LayoutService } from '../../../ctx-layout/layout/service/layout.service';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { NotificationType } from '../../../libraries/enums';

@Component({
    selector: 'app-auth-sign-up',
    templateUrl: 'sign-up.component.html',
    standalone: false
})
export class SignUpComponent extends ReactiveFormAbstract implements OnInit {
    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        formBuilder: FormBuilder,
        private authService: AuthService,
        public layoutService: LayoutService,
        private router: Router
    ) {
        super(messageService, loadingService, formBuilder);
        this.updateValidationMessages();
    }

    ngOnInit(): void {
        this.createForms();
    }

    verificarTemaEscuro(): boolean {
        return this.layoutService.isDarkTheme() ?? false;
    }

    async onClickSignUp(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        if (this.form.value.password != this.form.value.confirmationPassword) {
            this.notify(NotificationType.ERROR, 'Senhas não coincidem.');
            return;
        }

        this.block();
        const request: SignupRequest = {
            username: this.form.value.username,
            password: this.form.value.password,
            role: this.form.value.role
            // TODO :: Definir como será diferenciado no cadadastro
            // role: 'TEACHER' || 'STUDENT'
        };

        this.authService.signup(request).subscribe(
            () => {
                this.unlock();
                this.router.navigateByUrl('/login');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private createForms(): void {
        this.form = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
            confirmationPassword: [null, Validators.required],
            role: ["STUDENT", Validators.required]
        });
    }

    private updateValidationMessages(): void {
        super.setValidationMessages({
            username: {
                required: 'Informe o E-mail'
            },
            password: {
                required: 'Informe a Senha'
            },
            confirmationPassword: {
                required: 'Informe a Confirmação de Senha'
            }
        });
    }
}
