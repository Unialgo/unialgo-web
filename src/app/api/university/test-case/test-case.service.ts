import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TestCase } from './models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TestCaseService {
    get url(): string {
        return `${environment.apiUrl}/public/test-case`;
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
        return this.http.get<TestCase>(`${this.url}/${request.id}`);
    }

    public getByQuestionId(request: any) {
        return this.http.get<TestCase[]>(`${this.url}/${request.id}`);
    }
}
