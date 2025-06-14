import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { CreateAssignmentRequest, AssignmentsService } from '../../../../api/university/assignment';

@Component({
    selector: 'ctx-university-create-assignment',
    templateUrl: 'create-assignment.component.html',
    standalone: false,
    providers: [DialogService]
})
export class CreateAssignmentComponent extends ModalBaseAbstract implements OnInit {
    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: AssignmentsService
    ) {
        super(messageService, loadingService, formBuilder);
        this.updateValidationMessages();
    }

    ngOnInit(): void {
        this.createForms();
    }

    onClickCancel(): void {
        this.notifyCancelation();
    }

    async onClickSalve(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        this.block('Saving...');

        const request: CreateAssignmentRequest = {
            title: this.form.value.title,
            description: this.form.value.description,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate
        };

        this.service.create(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Assignment successfully created');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private createForms(): void {
        this.form = this.formBuilder.group({
            title: [null, Validators.required],
            description: [null, Validators.required],
            startDate: [null, Validators.required],
            endDate: [null, Validators.required]
        });
    }

    private updateValidationMessages(): void {
        super.setValidationMessages({
            title: {
                required: 'Title is required'
            },
            description: {
                required: 'Description is required'
            },
            startDate: {
                required: 'Start date is required'
            },
            endDate: {
                required: 'End date is required'
            }
        });
    }
}
