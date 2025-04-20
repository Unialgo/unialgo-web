import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { CenarioDeTeste } from '../../../../api/faculdade';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-excluir-cenario-de-teste',
    templateUrl: 'excluir-cenario-de-teste.component.html',
    standalone: false
})
export class ExcluirCenarioDeTesteComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) cenario!: CenarioDeTeste;
    titulo: string = "Deseja excluir esse cenário de teste?";

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    onClickExcluir(): void {
        this.block('Excluindo...');
        setTimeout(() => {
            this.unlock();
            this.notifySuccess(true);
        }, 1000);
    }
}
