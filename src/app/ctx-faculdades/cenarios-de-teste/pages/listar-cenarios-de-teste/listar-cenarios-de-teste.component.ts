import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {Table} from 'primeng/table';
import {CenarioDeTeste} from '../../../../api/faculdade';

@Component({
    selector: 'ctx-faculdade-listar-cenarios-de-teste',
    templateUrl: 'listar-cenarios-de-teste.component.html',
    standalone: false,
})

export class ListarCenariosDeTesteComponent implements OnInit {
    @ViewChild('dt') dt!: Table;
    @Input() exercicioId: string;
    searchValue: string = '';

    editarVisible: boolean = false;

    cases!: CenarioDeTeste[];
    selectedCase: CenarioDeTeste | null = null;
    selectedCases: CenarioDeTeste[] = [];

    constructor() { }

    ngOnInit() {
        this.cases = mockData;
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table): void {
        table.clear();
        this.searchValue = '';
    }

    onClickEditar(CenarioDeTeste: CenarioDeTeste) {
        this.selectedCase = CenarioDeTeste;
        this.editarVisible = true;
    }

    onEditarVisibleEvent(event: any): void {
        this.editarVisible = false;
        this.selectedCase = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.editarVisible = false;
        this.selectedCase = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.editarVisible = false;
        this.selectedCase = null;
    }
}

export const mockData: CenarioDeTeste[] = [
    {
      id: '1',
      codigo: 'CT-001',
      exercicioId: 'EX-101',
      status: 1,
      statusDesc: 'Ativo',
      input: { valor1: 10, valor2: 20 },
      output: { resultado: 30 }
    },
    {
      id: '2',
      codigo: 'CT-002',
      exercicioId: 'EX-102',
      status: 2,
      statusDesc: 'Inativo',
      input: { valor1: 5, valor2: 7 },
      output: { resultado: 12 }
    },
    {
      id: '3',
      codigo: 'CT-003',
      exercicioId: 'EX-103',
      status: 3,
      statusDesc: 'Em revisão',
      input: { texto: 'abc', repetir: 2 },
      output: { resultado: 'abcabc' }
    },
    {
      id: '4',
      codigo: 'CT-004',
      exercicioId: 'EX-104',
      status: 1,
      statusDesc: 'Ativo',
      input: { lista: [1, 2, 3, 4] },
      output: { soma: 10 }
    },
    {
      id: '5',
      codigo: 'CT-005',
      exercicioId: 'EX-105',
      status: 0,
      statusDesc: 'Rascunho',
      input: { nome: 'João', idade: 25 },
      output: { mensagem: 'Olá João, você tem 25 anos' }
    }
  ];
  