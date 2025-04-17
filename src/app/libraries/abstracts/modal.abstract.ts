import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MessageService} from 'primeng/api';

@Component({template: ''})
export abstract class ModalBaseAbstract {
    @Input() visible: boolean = false;
    @Output() visibleEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<any>();
    @Output() cancelationEvent = new EventEmitter();

    protected constructor(
        protected messageService: MessageService,
        protected formBuilder: FormBuilder,
        protected router: Router,
        protected activatedRoute: ActivatedRoute) {
    }

    notifySuccess(resultado: any): void {
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