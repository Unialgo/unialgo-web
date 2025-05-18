import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { List, ListsService, UpdateListRequest } from '../../../../api/university/list';

@Component({
    selector: 'ctx-university-update-question-list',
    templateUrl: 'update-question.component.html',
    standalone: false
})
export class UpdateQuestionComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) questionLists!: List;

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: ListsService
    ) {
        super(messageService, loadingService, formBuilder);
        this.updateValidationMessages();
    }

    ngOnInit(): void {
        this.createForms();
        this.loadFormData();
    }

    onClickCancel(): void {
        this.notifyCancelation();
    }

    async onClickSave(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        this.block('Saving...');

        const request: UpdateListRequest = {
            id: this.questionLists.id,
            title: this.form.value.title,
            description: this.form.value.description,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate
        };

        this.service.update(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'List successfully updated');
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

    private loadFormData(): void {
        this.form.patchValue({
            title: this.questionLists.title,
            description: this.questionLists.description,
            startDate: new Date(this.questionLists.startDate),
            endDate: new Date(this.questionLists.endDate)
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
