import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { ExerciciosService } from '../../../../api/faculdade';
import { AIService } from '../../../../api/ai/ai.service';
import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-faculdade-adicionar-exercicio',
    templateUrl: 'adicionar-exercicio.component.html',
    standalone: false,
    providers: [DialogService]
})
export class AdicionarExercicioComponent extends ModalBaseAbstract implements OnInit {

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
    }

    onClickCancelar(): void {
        this.notifyCancelation();
    }

    abrirDialogGeracaoEnunciado(): void {
        this.geracaoEnunciadoVisible = true;
    }

    gerarEnunciado(): void {
        const titulo = this.form.get('titulo')?.value;

        // Valida titulo
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

        // Chama serviço
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
            title: this.form.value.titulo,
            statement: this.form.value.enunciado
        };

        this.service.adicionar(request).subscribe(
            () => {
                this.unlock();
                this.notifySuccess(true);
                this.notify(NotificationType.SUCCESS, 'Exercicio Adicionado');
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
