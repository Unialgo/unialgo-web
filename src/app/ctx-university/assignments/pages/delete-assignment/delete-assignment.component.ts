import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { Assignment, AssignmentsService } from '../../../../api/university/assignment';

@Component({
    selector: 'ctx-university-delete-assignment',
    templateUrl: 'delete-assignment.component.html',
    standalone: false
})
export class DeleteAssignmentComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) Assignment!: Assignment;
    title: string = 'Delete Assignment';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: AssignmentsService
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancel(): void {
        this.notifyCancelation();
    }

    onClickDelete(): void {
        this.block('Deleting...');
        this.service.delete({id: this.Assignment.id}).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Assignment successfully deleted')
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}
