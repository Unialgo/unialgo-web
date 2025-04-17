import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {MessageService} from 'primeng/api';

import {Exercicio} from '../../../../api/faculdade';
import {ModalBaseAbstract} from '../../../../libraries/abstracts';

@Component({
    selector: 'ctx-faculdade-editar-exercicio',
    templateUrl: 'editar-exercicio.component.html',
    standalone: false
})

export class EditarExercicioComponent extends ModalBaseAbstract implements OnInit {
    @Input({required: true}) exercicio!: Exercicio;

    constructor(
        protected override messageService: MessageService,
        protected override formBuilder: FormBuilder) {
        super(messageService, formBuilder);
    }

    ngOnInit(): void { 
        this.criarFormulario();
        this.carregarFormulario();
    }

    onClickCancelar(): void {
        this.block('Cancelando')
        setTimeout(() => {this.unlock()}, 1000)
    }
    
    onClickSalvar(): void {
        this.block('Salvando')
        setTimeout(() => {this.unlock()}, 1000)
    }

    private criarFormulario(): void {
        this.form = this.formBuilder.group({
            titulo: [null, Validators.required],
            enunciado: [null, Validators.required],
        })
    }

    private carregarFormulario(): void {
        this.form.patchValue({
            titulo: this.exercicio.titulo,
            enunciado: this.exercicio.enunciado
        })
    }
}