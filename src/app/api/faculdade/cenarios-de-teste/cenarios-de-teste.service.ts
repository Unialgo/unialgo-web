import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CenarioDeTeste } from './models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CenariosDeTesteService {
    get url(): string {
        return `${environment.apiUrl}/public/cenario-de-teste`;
    }

    constructor(private http: HttpClient) {}

    public adicionar(request: any) {
        return this.http.post<any>(`${this.url}/adicionar`, request);
    }

    public editar(request: any) {
        return this.http.put<any>(`${this.url}/editar/${request.id}`, request);
    }

    public excluir(request: any) {
        return this.http.delete<any>(`${this.url}/excluir/${request.id}`);
    }

    public obter(request: any) {
        return this.http.get<CenarioDeTeste>(`${this.url}/obter/${request.id}`);
    }

    public obterPorExercicio(exercicioId: string) {
        return this.http.get<CenarioDeTeste[]>(`${this.url}/obter-por-exercicio/${exercicioId}`);
    }
}
