import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { Question, QuestionsService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-university-list-questions',
    templateUrl: 'list-questions.component.html',
    standalone: false
})
export class ListQuestionsComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    questions!: Question[];
    selectedQuestion: Question | null = null;
    selectedQuestions: Question[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: QuestionsService
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

    onClickUpdate(question: Question) {
        this.selectedQuestion = question;
        this.updateVisible = true;
    }

    onUpdateVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedQuestion = null;
    }

    onUpdateSuccessEvent(event: any): void {
        this.updateVisible = false;
        this.selectedQuestion = null;
    }

    onUpdateCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedQuestion = null;
    }

    onClickDelete(question: Question) {
        this.selectedQuestion = question;
        this.deleteVisible = true;
    }

    onDeleteVisibleEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedQuestion = null;
    }

    onDeleteSuccessEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedQuestion = null;
        this.onClickReload();
    }

    onDeleteCancelationEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedQuestion = null;
    }

    private getData(): void {
        this.service.getAll().subscribe(
            (res) => {
                this.questions = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}