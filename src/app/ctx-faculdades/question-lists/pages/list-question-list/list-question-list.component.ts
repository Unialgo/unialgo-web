import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { List, ListsService } from '../../../../api/faculdade/list';

@Component({
    selector: 'ctx-university-list-question-list',
    templateUrl: 'list-question-list.component.html',
    standalone: false
})
export class ListQuestionListComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    questionList!: List[];
    selectedQuestionList: List | null = null;
    selectedQuestionLists: List[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: ListsService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.getData();
    }

    onClickUpdate(): void {
        this.block();
        this.getData();
    }

    onClickAdicionar(): void {
        this.adicionarVisible = true;
    }

    onAdicionarVisibleEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onAdicionarSuccessEvent(event: any): void {
        this.adicionarVisible = false;
        this.onClickUpdate();
    }

    onAdicionarCancelationEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onClickEditar(questionList: List) {
        this.selectedQuestionList = questionList;
        this.editarVisible = true;
    }

    onEditarVisibleEvent(event: any): void {
        this.editarVisible = false;
        this.selectedQuestionList = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.editarVisible = false;
        this.selectedQuestionList = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.editarVisible = false;
        this.selectedQuestionList = null;
    }

    onClickExcluir(questionList: List) {
        this.selectedQuestionList = questionList;
        this.excluirVisible = true;
    }

    onExcluirVisibleEvent(event: any): void {
        this.excluirVisible = false;
        this.selectedQuestionList = null;
    }

    onExcluirSuccessEvent(event: any): void {
        this.excluirVisible = false;
        this.selectedQuestionList = null;
        this.onClickUpdate();
    }

    onExcluirCancelationEvent(event: any): void {
        this.excluirVisible = false;
        this.selectedQuestionList = null;
    }

    private getData(): void {
        this.service.getAll().subscribe(
            (res) => {
                this.questionList = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}