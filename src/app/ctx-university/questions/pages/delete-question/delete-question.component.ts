import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { Question, QuestionsService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-university-delete-question',
    templateUrl: 'delete-question.component.html',
    standalone: false
})
export class DeleteQuestionComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) question!: Question;
    title: string = 'Delete Question';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: QuestionsService
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancel(): void {
        this.notifyCancelation();
    }

    onClickDelete(): void {
        this.block('Deleting...');
        this.service.delete({id: this.question.id}).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Question deleted succesfully')
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}
