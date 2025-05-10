import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { List, ListsService } from '../../../../api/faculdade/list';

@Component({
    selector: 'ctx-university-delete-question-list',
    templateUrl: 'delete-question-list.component.html',
    standalone: false
})
export class DeleteQuestionListComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) questionLists!: List;
    title: string = 'Delete Question List';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: ListsService
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancel(): void {
        this.notifyCancelation();
    }

    onClickDelete(): void {
        this.block('Deleting...');
        this.service.delete({id: this.questionLists.id}).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'List successfully deleted')
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}
