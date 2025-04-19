import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ModalBaseAbstract } from '../../../../libraries/abstracts';
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
        protected override formBuilder: FormBuilder
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {
        this.criarFormulario();
    }

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    onClickSalvar(): void {
        this.block('Salvando');
        setTimeout(() => {
            this.unlock();
            this.notifySuccess(true);
        }, 1000);
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            codigo: [null, Validators.required],
            input: [null, Validators.required],
            output: [null, Validators.required]
        });
    }
}
