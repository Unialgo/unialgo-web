import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Question } from './models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
    get url(): string {
        return `${environment.apiUrl}/questions`;
    }

    constructor(private http: HttpClient) {}

    public create(request: any) {
        return this.http.post<any>(`${this.url}`, request);
    }

    public update(request: any) {
        return this.http.put<any>(`${this.url}/${request.id}`, request);
    }

    public delete(request: any) {
        return this.http.delete<any>(`${this.url}/${request.id}`);
    }

    public get(request: any) {
        return this.http.get<Question>(`${this.url}/${request.id}`);
    }

    public getAll() {
        return this.http.get<Question[]>(`${this.url}`);
    }

    public getAllByAssignmentId(id: string) {
        return this.http.get<Question[]>(`${this.url}/${id}/assignment`);
    }
}
