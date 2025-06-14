import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { TestCase, TestCaseService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-university-update-test-case',
    templateUrl: 'update-test-case.component.html',
    standalone: false
})
export class UpdateTestCaseComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) testCase!: TestCase;
    title: string = 'Update Test Case';

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: TestCaseService
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

        const request: any = {
            //    TODO: Integrar quando for feito
        };

        this.service.update(request).subscribe(
            () => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Test case updated succesfully');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private createForms(): void {
        this.form = this.formBuilder.group({
            code: [null, Validators.required],
            input: [null, Validators.required],
            output: [null, Validators.required]
        });
    }

    private loadFormData(): void {
        this.form.patchValue({
            code: this.testCase.code,
            input: JSON.stringify(this.testCase.input),
            output: JSON.stringify(this.testCase.output)
        });
    }

    private updateValidationMessages(): void {
        super.setValidationMessages({
            code: {
                required: 'Code is required'
            },
            input: {
                required: 'Input is required'
            },
            output: {
                required: 'Output is required'
            }
        });
    }
}
