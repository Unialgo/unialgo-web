import {FormBuilder} from '@angular/forms';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MessageService} from 'primeng/api';
import {ReactiveFormAbstract} from './reactive-form.abstract';

@Component({template: ''})
export abstract class ModalBaseAbstract extends ReactiveFormAbstract {
    @Input() visible: boolean = false;
    @Output() visibleEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<any>();
    @Output() cancelationEvent = new EventEmitter();

    constructor(
        protected override messageService: MessageService,
        protected override formBuilder: FormBuilder) {
        super(messageService, formBuilder);
    }

    notifyConclusion(resultado: any): void {
        this.successEvent.emit(resultado);
        this.onHide();
    }

    notifyCancelation(resultado?: any): void {
        this.cancelationEvent.emit(resultado);
        this.onHide();
    }

    onHide(): void {
        this.visible = false;
        this.visibleEvent.emit(this.visible);
    }
}