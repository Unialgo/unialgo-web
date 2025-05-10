import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { CenariosDeTesteService } from '../../../../api/faculdade';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-adicionar-cenario-de-teste',
    templateUrl: 'adicionar-cenario-de-teste.component.html',
    standalone: false
})
export class AdicionarCenarioDeTesteComponent extends ModalBaseAbstract implements OnInit {
    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: CenariosDeTesteService
    ) {
        super(messageService, loadingService, formBuilder);
        this.updateValidationMessages();
    }

    ngOnInit(): void {
        this.createForms();
        
    }

    onClickCancel(): void {
        this.notifyCancelation();
    }

    async onClickSave(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        this.block('Saving...');

        const request: any = {
            title: this.form.value.title,
            statement: this.form.value.enunciado
        };

        this.service.adicionar(request).subscribe(
            () => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Question created com Sucesso');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private createForms(): void {
        this.form = this.formBuilder.group({
            codigo: [null, Validators.required],
            input: [null, Validators.required],
            output: [null, Validators.required]
        });
    }

    private updateValidationMessages(): void {
        super.setValidationMessages({
            codigo: {
                required: 'Informe o Codigo'
            },
            input: {
                required: 'Informe o Input'
            },
            output: {
                required: 'Informe o Output'
            }
        });
    }
}
