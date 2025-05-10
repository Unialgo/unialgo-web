import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { Exercicio, ExerciciosService } from '../../../../api/faculdade';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-listar-exercicios',
    templateUrl: 'listar-exercicios.component.html',
    standalone: false
})
export class ListarExerciciosComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    exercises!: Exercicio[];
    selectedExercise: Exercicio | null = null;
    selectedExercises: Exercicio[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: ExerciciosService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
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
        this.onClickAtualizar();
    }

    onAdicionarCancelationEvent(event: any): void {
        this.createVisible = false;
    }

    onClickEditar(exercicio: Exercicio) {
        this.selectedExercise = exercicio;
        this.updateVisible = true;
    }

    onupdateVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedExercise = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.updateVisible = false;
        this.selectedExercise = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedExercise = null;
    }

    onClickExcluir(exercicio: Exercicio) {
        this.selectedExercise = exercicio;
        this.deleteVisible = true;
    }

    ondeleteVisibleEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedExercise = null;
    }

    onExcluirSuccessEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedExercise = null;
        this.onClickAtualizar();
    }

    onExcluirCancelationEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedExercise = null;
    }

    private obterDados(): void {
        this.service.obterTodos().subscribe(
            (res) => {
                this.exercises = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}