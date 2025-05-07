import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { CreateListRequest, List, UpdateListRequest } from '.';

@Injectable({ providedIn: 'root' })
export class ListsService {
    get url(): string {
        return `${environment.apiUrl}/lists`;
    }

    constructor(private http: HttpClient) {}

    public create(request: CreateListRequest) {
        return this.http.post<any>(`${this.url}`, request);
    }

    public update(request: UpdateListRequest) {
        return this.http.put<any>(`${this.url}/${request.id}`, request);
    }

    public delete(request: any) {
        return this.http.delete<any>(`${this.url}/${request.id}`);
    }

    public get(request: any) {
        return this.http.get<List>(`${this.url}/${request.id}`);
    }

    public getAll() {
        return this.http.get<List[]>(`${this.url}`);
    }
}
