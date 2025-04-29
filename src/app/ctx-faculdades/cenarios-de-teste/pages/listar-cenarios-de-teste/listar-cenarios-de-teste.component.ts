import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { CenarioDeTeste, CenariosDeTesteService } from '../../../../api/faculdade';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { NotificationType } from '../../../../libraries/enums';

@Component({
    selector: 'ctx-faculdade-listar-cenarios-de-teste',
    templateUrl: 'listar-cenarios-de-teste.component.html',
    standalone: false
})
export class ListarCenariosDeTesteComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;
    @Input({ required: true }) exercicioId: string;

    cases!: CenarioDeTeste[];
    selectedCase: CenarioDeTeste | null = null;
    selectedCases: CenarioDeTeste[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: CenariosDeTesteService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit(): void {
        this.obterDados();
    }

    onClickAtualizar(): void {
        this.block();
        this.obterDados();
    }

    onClickAdicionar(): void {
        this.adicionarVisible = true;
    }

    onAdicionarVisibleEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onAdicionarSuccessEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onAdicionarCancelationEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onClickEditar(CenarioDeTeste: CenarioDeTeste) {
        this.selectedCase = CenarioDeTeste;
        this.editarVisible = true;
    }

    onEditarVisibleEvent(event: any): void {
        this.editarVisible = false;
        this.selectedCase = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.editarVisible = false;
        this.selectedCase = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.editarVisible = false;
        this.selectedCase = null;
    }

    onClickExcluir(CenarioDeTeste: CenarioDeTeste) {
        this.selectedCase = CenarioDeTeste;
        this.excluirVisible = true;
    }

    onExcluirVisibleEvent(event: any): void {
        this.selectedCase = null;
        this.excluirVisible = false;
    }

    onExcluirSuccessEvent(event: any): void {
        this.selectedCase = null;
        this.excluirVisible = false;
    }

    onExcluirCancelationEvent(event: any): void {
        this.selectedCase = null;
        this.excluirVisible = false;
    }

    private obterDados(): void {
        this.service.obterPorExercicio(this.exercicioId).subscribe(
            (res) => {
                this.cases = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}