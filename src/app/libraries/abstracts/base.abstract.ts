import { Component } from '@angular/core';

import { MessageService, ToastMessageOptions } from 'primeng/api';

import { NotificationType } from '../enums';
import { LoadingService } from '../../ctx-layout/layout/service/loading.service';

@Component({ template: '' })
export abstract class BaseAbstract {
    public errors: any[] = [];

    constructor(
        protected messageService: MessageService,
        protected loadingService: LoadingService
    ) {}

    protected async block(message?: any): Promise<void> {
        this.loadingService.start(message ?? 'Carregando...');
    }

    protected async unlock(): Promise<void> {
        this.loadingService.stop();
    }

    protected async notify(color: string, title?: string, message?: string): Promise<void> {
        await this.unlock();
        const notificationType = color[0].toLocaleUpperCase() + color.slice(1);
        this.messageService.add({ severity: color, summary: title ?? notificationType, detail: message });
    }

    protected async notifyMultiple(color: string, messages: string[]): Promise<void> {
        await this.unlock();
        this.messageService.addAll(messages.map((message) => ({ severity: color, detail: message }) as ToastMessageOptions));
    }

    protected async notifyMessages(): Promise<void> {
        const messages: string[] = [];

        for (const error in this.errors) {
            if (this.errors.hasOwnProperty(error) && [undefined, null, ''].includes(this.errors[error])) {
                messages.push(this.errors[error]);
            }
        }

        await this.notifyMultiple(NotificationType.ERROR, messages);
    }

    protected async onServerFailed(response: any): Promise<void> {
        this.clearErrors();
        this.errors = response;
        await this.notifyMessages();
    }

    protected async onServerComplete(): Promise<void> {
        this.clearErrors();
        await this.unlock();
    }

    protected clearErrors(): void {
        this.errors = [];
    }
}