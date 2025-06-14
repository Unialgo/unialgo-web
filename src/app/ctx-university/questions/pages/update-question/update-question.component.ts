import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { Question, QuestionsService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { NotificationType } from '../../../../libraries/enums';
import { AIService } from '../../../../api/ai/ai.service';

@Component({
    selector: 'ctx-university-update-question',
    templateUrl: 'update-question.component.html',
    standalone: false
})
export class UpdateQuestionComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) question!: Question;

    geracaoEnunciadoVisible = false;
    contextoAdicional = '';
    gerandoEnunciado = false;

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: QuestionsService,
        private aiService: AIService
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

    openStatmentGenerationDialog(): void {
        this.geracaoEnunciadoVisible = true;
    }

    generateStatement(): void {
        const title = this.form.get('title')?.value;

        if (!title) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Preencha o título do exercício antes de gerar o enunciado.'
            });
            return;
        }

        this.block('Generating statement');
        this.gerandoEnunciado = true;

        this.aiService.generateStatement({
            title: title,
            context: this.contextoAdicional || 'Sem contexto adicional'
        }).subscribe({
            next: (response) => {
                this.form.get('enunciado')?.setValue(response.statement);

                this.unlock();
                this.geracaoEnunciadoVisible = false;
                this.gerandoEnunciado = false;

                this.contextoAdicional = '';

                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Enunciado gerado com sucesso!'
                });
            },
            error: (error) => {
                this.unlock();
                this.gerandoEnunciado = false;

                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.message || 'Erro ao gerar enunciado. Tente novamente.'
                });
            }
        });
    }

    async onClickSave(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        this.block('Saving...');

        const request: any = {
            id: this.question.id,
            title: this.form.value.title,
            statement: this.form.value.enunciado
        };

        this.service.update(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Question Editado')
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
            enunciado: [null, Validators.required]
        });
    }

    private loadFormData(): void {
        this.form.patchValue({
            title: this.question.title,
            enunciado: this.question.statement
        });
    }

    private updateValidationMessages(): void {
        super.setValidationMessages({
            title: {
                required: 'Informe o Titulo'
            },
            enunciado: {
                required: 'Informe o Enunciado'
            }
        });
    }
}
