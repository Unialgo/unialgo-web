import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MessageService} from 'primeng/api';

import {ModalBaseAbstract} from '../../../../libraries/abstracts';
import {Exercicio} from '../../../../api/faculdade';

@Component({
    selector: 'ctx-faculdade-editar-exercicio',
    templateUrl: 'editar-exercicio.component.html',
    standalone: false
})

export class EditarExercicioComponent extends ModalBaseAbstract implements OnInit {
    @Input({required: true}) exercicio!: Exercicio;
    public form!: FormGroup;

    constructor(
        protected override messageService: MessageService,
        protected override formBuilder: FormBuilder,
        protected override router: Router,
        protected override activatedRoute: ActivatedRoute) {
        super(messageService, formBuilder, router, activatedRoute)
    }

    ngOnInit(): void { 
        this.criarFormulario();
        this.carregarFormulario();
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