import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { Question, QuestionsService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { AddQuestionToAssignmentRequest, DeleteQuestionFromListRequest, Assignment, AssignmentsService, UpdateListRequest, UpdateAssignmentRequest } from '../../../../api/university/assignment';

@Component({
    selector: 'ctx-university-update-assignment',
    templateUrl: 'update-assignment.component.html',
    standalone: false
})
export class UpdateQuestionComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) Assignment!: Assignment;

    assignmentQuestions: Question[] = [];

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: AssignmentsService,
        private questionsService: QuestionsService
    ) {
        super(messageService, loadingService, formBuilder);
        this.updateValidationMessages();
    }

    ngOnInit(): void {
        this.createForms();
        this.loadFormData();
        this.getAssignmentQuestions();
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
            id: this.Assignment.id,
            title: this.form.value.title,
            description: this.form.value.description,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate
        };

        this.service.update(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Assignment successfully updated');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    onAddQuestionToList(event: any): void {
        const request: AddQuestionToAssignmentRequest = {
            listId: this.Assignment.id,
            questionId: event.id,
            index: event.index
        };

        this.service.addQuestionToList(request).subscribe(
            () => {},
            (error) => {
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    onDeleteQuestionFromList(event: any): void {
        const request: DeleteQuestionFromListRequest = {
            listId: this.Assignment.id,
            questionId: event.id
        };

        this.service.deleteQuestionFromList(request).subscribe(
            () => {},
            (error) => {
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    async onChangeAssignment(event: any[]): Promise<void> {
        const request: UpdateAssignmentRequest = {
            listId: this.Assignment.id,
            questions: event.map((o) => {
                return { questionId: o.id, index: event.indexOf(o) };
            })
        };

        this.service.updateQuestionsFromList(request).subscribe(
            () => {},
            (error) => {
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private getAssignmentQuestions(): void {
        this.questionsService.getAllByAssignmentId(this.Assignment.id).subscribe(
            (res) => {
                this.assignmentQuestions = res;
            },
            (error) => {
                this.notify(NotificationType.ERROR, undefined, error.message);
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
            title: this.Assignment.title,
            description: this.Assignment.description,
            startDate: new Date(this.Assignment.startDate),
            endDate: new Date(this.Assignment.endDate)
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
