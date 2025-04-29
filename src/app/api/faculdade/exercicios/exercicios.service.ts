import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Exercicio } from './models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExerciciosService {
    get url(): string {
        return `${environment.apiUrl}/questions`;
    }

    constructor(private http: HttpClient) {}

    public adicionar(request: any) {
        return this.http.post<any>(`${this.url}`, request);
    }

    public editar(request: any) {
        return this.http.patch<any>(`${this.url}/${request.id}`, request);
    }

    public excluir(request: any) {
        return this.http.delete<any>(`${this.url}/${request.id}`);
    }

    public obter(request: any) {
        return this.http.get<Exercicio>(`${this.url}/${request.id}`);
    }

    public obterTodos() {
        return this.http.get<Exercicio[]>(`${this.url}`);
    }
}
