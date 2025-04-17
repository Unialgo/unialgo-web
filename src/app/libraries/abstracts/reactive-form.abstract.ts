import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MessageService} from 'primeng/api';

import {BaseAbstract} from './base.abstract';
import {FormValidation} from '../utils';


@Component({template: ''})
export abstract class ReactiveFormAbstract extends BaseAbstract {
    public form: FormGroup;
    public formValidator: FormValidation;
    public validationMessages: {[key: string]: {[key: string]: string}};
    private displayMessage: {[key: string]: string} = {};

    constructor(
        protected override messageService: MessageService,
        protected formBuilder: FormBuilder) {
        super(messageService)
    }

    protected setValidationMessages(messages: {[key: string]: {[key: string]: string}}): void {
        this.validationMessages = messages;
        this.formValidator = new FormValidation(this.validationMessages);
    }

    protected async onClientFailed(): Promise<boolean> {
        this.clear();

        if (this.form.valid) {
            return false;
        }

        this.displayMessage = this.formValidator.processMessages(this.form);

        for (const key in this.displayMessage) {
            if (this.displayMessage.hasOwnProperty(key)) {
                this.errors.push(this.displayMessage[key]);
            }
        }

        await this.notifyMessages();
        return true;
    }

    protected clear(): void {
        this.clearErrors();
        this.displayMessage = {};
    }
}