import {Component} from '@angular/core';

import {MessageService} from 'primeng/api';

import {LoadingService} from '../../ctx-layout/layout/service/loading.service';
import {BaseAbstract} from './base.abstract';
import { Table } from 'primeng/table';
import { NotificationType } from '../enums';

@Component({template: ''})
export abstract class EntityListAbstract extends BaseAbstract {
    searchValue: string = '';
    createVisible: boolean = false;
    updateVisible: boolean = false;
    deleteVisible: boolean = false;

    constructor(
        messageService: MessageService,
        loadingService: LoadingService) {
        super(messageService, loadingService);
    }

    onClickClearFilters(table: Table): void {
        this.notify(NotificationType.INFO, undefined, 'Filters cleared');
        table.clear();
        this.searchValue = '';
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}