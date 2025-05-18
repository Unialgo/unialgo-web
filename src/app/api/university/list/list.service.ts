import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AddQuestionToListRequest, CreateListRequest, DeleteQuestionFromListRequest, List, UpdateListRequest, UpdateQuestionListRequest } from '.';

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

    public addQuestionToList(request: AddQuestionToListRequest) {
        return this.http.post<any>(`${this.url}/${request.listId}/question`, request);
    }

    public updateQuestionsFromList(request: UpdateQuestionListRequest) {
        return this.http.put<any>(`${this.url}/${request.listId}/questions`, request);
    }

    public deleteQuestionFromList(request: DeleteQuestionFromListRequest) {
        return this.http.delete<any>(`${this.url}/${request.listId}/${request.questionId}`);
    }
}
