import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-adicionar-exercicio',
    templateUrl: 'adicionar-exercicio.component.html',
    standalone: false
})
export class AdicionarExercicioComponent extends ModalBaseAbstract implements OnInit {
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
            titulo: [null, Validators.required],
            enunciado: [null, Validators.required]
        });
    }
}