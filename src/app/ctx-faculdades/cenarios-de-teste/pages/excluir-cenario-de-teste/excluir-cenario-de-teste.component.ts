import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { CenarioDeTeste, CenariosDeTesteService } from '../../../../api/faculdade';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-excluir-cenario-de-teste',
    templateUrl: 'excluir-cenario-de-teste.component.html',
    standalone: false
})
export class ExcluirCenarioDeTesteComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) cenario!: CenarioDeTeste;
    title: string = 'Deseja excluir esse cenário de teste?';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: CenariosDeTesteService
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancel(): void {
        this.notifyCancelation();
    }

    onClickDelete(): void {
        this.block('Excluindo...');
        this.service.excluir(this.cenario.id).subscribe(
            () => {
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}
