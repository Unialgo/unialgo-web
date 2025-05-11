import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { List, ListsService } from '../../../../api/university/list';

@Component({
    selector: 'ctx-university-list-question-list',
    templateUrl: 'list-question-list.component.html',
    standalone: false
})
export class ListQuestionListComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    questionLists!: List[];
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

    onClickReload(): void {
        this.block();
        this.getData();
    }

    onClickCreate(): void {
        this.createVisible = true;
    }

    onCreateVisibleEvent(event: any): void {
        this.createVisible = false;
    }

    onCreateSuccessEvent(event: any): void {
        this.createVisible = false;
        this.onClickReload();
    }

    onCreateCancelationEvent(event: any): void {
        this.createVisible = false;
    }

    onClickUpdate(questionLists: List) {
        this.selectedQuestionList = questionLists;
        this.updateVisible = true;
    }

    onUpdateVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedQuestionList = null;
    }

    onUpdateSuccessEvent(event: any): void {
        this.updateVisible = false;
        this.selectedQuestionList = null;
        this.onClickReload();
    }

    onUpdateCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedQuestionList = null;
    }

    onClickDelete(questionLists: List) {
        this.selectedQuestionList = questionLists;
        this.deleteVisible = true;
    }

    onDeleteVisibleEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedQuestionList = null;
    }

    onDeleteSuccessEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedQuestionList = null;
        this.onClickReload();
    }

    onDeleteCancelationEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedQuestionList = null;
    }

    private getData(): void {
        this.service.getAll().subscribe(
            (res) => {
                this.questionLists = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}