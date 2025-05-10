import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { CenarioDeTeste, CenariosDeTesteService } from '../../../../api/faculdade';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-editar-cenario-de-teste',
    templateUrl: 'editar-cenario-de-teste.component.html',
    standalone: false
})
export class EditarCenarioDeTesteComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) cenario!: CenarioDeTeste;

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
        this.loadFormData();
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
            //    TODO: Integrar quando for feito
        };

        this.service.editar(request).subscribe(
            () => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Exercicio Editado com Sucesso');
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

    private loadFormData(): void {
        this.form.patchValue({
            codigo: this.cenario.codigo,
            input: JSON.stringify(this.cenario.input),
            output: JSON.stringify(this.cenario.output)
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
