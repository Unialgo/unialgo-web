import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { Exercicio, ExerciciosService } from '../../../../api/faculdade';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { NotificationType } from '../../../../libraries/enums';
import { AIService } from '../../../../api/ai/ai.service';

@Component({
    selector: 'ctx-faculdade-editar-exercicio',
    templateUrl: 'editar-exercicio.component.html',
    standalone: false
})
export class EditarExercicioComponent extends ModalBaseAbstract implements OnInit {
    @Input({ required: true }) exercicio!: Exercicio;

    geracaoEnunciadoVisible = false;
    contextoAdicional = '';
    gerandoEnunciado = false;

    constructor(
        protected override messageService: MessageService,
        protected override loadingService: LoadingService,
        protected override formBuilder: FormBuilder,
        private service: ExerciciosService,
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
            id: this.exercicio.id,
            title: this.form.value.title,
            statement: this.form.value.enunciado
        };

        this.service.editar(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Exercicio Editado')
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
            title: this.exercicio.title,
            enunciado: this.exercicio.statement
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
