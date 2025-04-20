import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { Exercicio } from '../../../../api/faculdade';
import { BaseAbstract, NotificationType } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-listar-exercicios',
    templateUrl: 'listar-exercicios.component.html',
    standalone: false
})
export class ListarExerciciosComponent extends BaseAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;
    searchValue: string = '';

    editarVisible: boolean = false;

    exercises!: Exercicio[];
    selectedExercise: Exercicio | null = null;
    selectedExercises: Exercicio[] = [];

    constructor(messageService: MessageService, loadingService: LoadingService) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.exercises = mockData;
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onClickClear(table: Table): void {
        this.notify(NotificationType.SUCCESS, undefined, 'Filtros removidos com sucesso.');
        table.clear();
        this.searchValue = '';
    }

    onClickAtualizar(): void {
        this.block('Carregando...');
        setTimeout(() => {
            this.unlock();
        }, 500);
    }

    onClickEditar(exercicio: Exercicio) {
        this.selectedExercise = exercicio;
        this.editarVisible = true;
    }

    onEditarVisibleEvent(event: any): void {
        this.editarVisible = false;
        this.selectedExercise = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.editarVisible = false;
        this.selectedExercise = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.editarVisible = false;
        this.selectedExercise = null;
    }
}

const mockData: Exercicio[] = [
    {
        id: 'a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78',
        userId: '123e4567-e89b-12d3-a456-426614174000',
        status: 1,
        titulo: 'Título de Exemplo 1',
        enunciado: 'Este é o enunciado da primeira questão de teste.'
    },
    {
        id: '98eecff1-4b78-4b32-a1f0-cc3432ddae5d',
        userId: '223e4567-e89b-12d3-a456-426614174001',
        status: 2,
        titulo: 'Título de Exemplo 2',
        enunciado: 'Este é o enunciado da segunda questão de teste.'
    },
    {
        id: '11fd2c56-3347-4b6d-a654-c8123fd872f2',
        userId: '323e4567-e89b-12d3-a456-426614174002',
        status: 0,
        titulo: 'Título de Exemplo 3',
        enunciado: 'Este é o enunciado da terceira questão de teste.'
    },
    {
        id: 'c43acdef-6c52-4c20-a77f-bf999f781263',
        userId: '423e4567-e89b-12d3-a456-426614174003',
        status: 3,
        titulo: 'Título de Exemplo 4',
        enunciado: 'Este é o enunciado da quarta questão de teste.'
    },
    {
        id: 'fab45d90-129f-451b-93a7-bcfe20d88010',
        userId: '523e4567-e89b-12d3-a456-426614174004',
        status: 1,
        titulo: 'Título de Exemplo 5',
        enunciado: 'Este é o enunciado da quinta questão de teste.'
    }
];
