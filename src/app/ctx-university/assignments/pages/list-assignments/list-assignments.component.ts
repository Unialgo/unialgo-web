import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { Assignment, AssignmentsService } from '../../../../api/university/assignment';

@Component({
    selector: 'ctx-university-list-assignment',
    templateUrl: 'list-assignments.component.html',
    standalone: false
})
export class ListAssignmentComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    Assignments!: Assignment[];
    selectedAssignment: Assignment | null = null;
    selectedAssignments: Assignment[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: AssignmentsService
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

    onClickUpdate(Assignments: Assignment) {
        this.selectedAssignment = Assignments;
        this.updateVisible = true;
    }

    onUpdateVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedAssignment = null;
    }

    onUpdateSuccessEvent(event: any): void {
        this.updateVisible = false;
        this.selectedAssignment = null;
        this.onClickReload();
    }

    onUpdateCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedAssignment = null;
    }

    onClickDelete(Assignments: Assignment) {
        this.selectedAssignment = Assignments;
        this.deleteVisible = true;
    }

    onDeleteVisibleEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedAssignment = null;
    }

    onDeleteSuccessEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedAssignment = null;
        this.onClickReload();
    }

    onDeleteCancelationEvent(event: any): void {
        this.deleteVisible = false;
        this.selectedAssignment = null;
    }

    private getData(): void {
        this.service.getAll().subscribe(
            (res) => {
                this.Assignments = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}