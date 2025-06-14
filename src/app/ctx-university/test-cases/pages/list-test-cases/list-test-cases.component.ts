import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { TestCase, TestCaseService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { NotificationType } from '../../../../libraries/enums';

@Component({
    selector: 'ctx-university-list-test-cases',
    templateUrl: 'list-test-cases.component.html',
    standalone: false
})
export class ListTestCaseComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;
    @Input({ required: true }) questionId: string;

    cases!: TestCase[];
    selectedCase: TestCase | null = null;
    selectedCases: TestCase[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: TestCaseService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit(): void {
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
    }

    onCreateCancelationEvent(event: any): void {
        this.createVisible = false;
    }

    onClickUpdate(TestCase: TestCase) {
        this.selectedCase = TestCase;
        this.updateVisible = true;
    }

    onUpdateVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedCase = null;
    }

    onUpdateSuccessEvent(event: any): void {
        this.updateVisible = false;
        this.selectedCase = null;
    }

    onUpdateCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedCase = null;
    }

    onClickDelete(TestCase: TestCase) {
        this.selectedCase = TestCase;
        this.deleteVisible = true;
    }

    onDeleteVisibleEvent(event: any): void {
        this.selectedCase = null;
        this.deleteVisible = false;
    }

    onDeleteSuccessEvent(event: any): void {
        this.selectedCase = null;
        this.deleteVisible = false;
    }

    onDeleteCancelationEvent(event: any): void {
        this.selectedCase = null;
        this.deleteVisible = false;
    }

    private getData(): void {
        this.service.getByQuestionId(this.questionId).subscribe(
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