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
        this.createVisible = true;
    }

    oncreateVisibleEvent(event: any): void {
        this.createVisible = false;
    }

    onAdicionarSuccessEvent(event: any): void {
        this.createVisible = false;
    }

    onAdicionarCancelationEvent(event: any): void {
        this.createVisible = false;
    }

    onClickEditar(CenarioDeTeste: CenarioDeTeste) {
        this.selectedCase = CenarioDeTeste;
        this.updateVisible = true;
    }

    onupdateVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedCase = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.updateVisible = false;
        this.selectedCase = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedCase = null;
    }

    onClickExcluir(CenarioDeTeste: CenarioDeTeste) {
        this.selectedCase = CenarioDeTeste;
        this.deleteVisible = true;
    }

    ondeleteVisibleEvent(event: any): void {
        this.selectedCase = null;
        this.deleteVisible = false;
    }

    onExcluirSuccessEvent(event: any): void {
        this.selectedCase = null;
        this.deleteVisible = false;
    }

    onExcluirCancelationEvent(event: any): void {
        this.selectedCase = null;
        this.deleteVisible = false;
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