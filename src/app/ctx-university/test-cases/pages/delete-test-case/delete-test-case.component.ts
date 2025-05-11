import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { TestCase, TestCaseService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-university-delete-test-case',
    templateUrl: 'delete-test-case.component.html',
    standalone: false
})
export class DeleteTestCaseComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) testCase!: TestCase;
    title: string = 'Delete Test Case';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: TestCaseService
    ) {
        super(messageService, loadingService, formBuilder);
    }

    ngOnInit(): void {}

    onClickCancel(): void {
        this.notifyCancelation();
    }

    onClickDelete(): void {
        this.block('Deleting...');
        this.service.delete(this.testCase.id).subscribe(
            () => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Test case deleted succesfully');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}
