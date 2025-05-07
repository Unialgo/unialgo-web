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
        this.atualizarMensagensValidacao();
    }

    ngOnInit(): void {
        this.criarFormulario();
        this.carregarFormulario();
    }

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    abrirDialogGeracaoEnunciado(): void {
        this.geracaoEnunciadoVisible = true;
    }

    gerarEnunciado(): void {
        const titulo = this.form.get('titulo')?.value;

        if (!titulo) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Preencha o título do exercício antes de gerar o enunciado.'
            });
            return;
        }

        this.block('Gerando enunciado');
        this.gerandoEnunciado = true;

        this.aiService.gerarEnunciado({
            title: titulo,
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

    async onClickSalvar(): Promise<void> {
        if (await this.onClientFailed()) {
            return;
        }

        this.block('Salvando...');

        const request: any = {
            id: this.exercicio.id,
            title: this.form.value.titulo,
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

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            titulo: [null, Validators.required],
            enunciado: [null, Validators.required]
        });
    }

    private carregarFormulario(): void {
        this.form.patchValue({
            titulo: this.exercicio.title,
            enunciado: this.exercicio.statement
        });
    }

    private atualizarMensagensValidacao(): void {
        super.setValidationMessages({
            titulo: {
                required: 'Informe o Titulo'
            },
            enunciado: {
                required: 'Informe o Enunciado'
            }
        });
    }
}
