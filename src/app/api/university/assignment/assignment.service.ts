import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AddQuestionToAssignmentRequest, CreateAssignmentRequest, DeleteQuestionFromListRequest, Assignment, UpdateListRequest, UpdateAssignmentRequest } from '.';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
    get url(): string {
        return `${environment.apiUrl}/assignments`;
    }

    constructor(private http: HttpClient) {}

    public create(request: CreateAssignmentRequest) {
        return this.http.post<any>(`${this.url}`, request);
    }

    public update(request: UpdateListRequest) {
        return this.http.put<any>(`${this.url}/${request.id}`, request);
    }

    public delete(request: any) {
        return this.http.delete<any>(`${this.url}/${request.id}`);
    }

    public get(request: any) {
        return this.http.get<Assignment>(`${this.url}/${request.id}`);
    }

    public getAll() {
        return this.http.get<Assignment[]>(`${this.url}`);
    }

    public addQuestionToList(request: AddQuestionToAssignmentRequest) {
        const body = { questionId: request.questionId, index: request.index };

        return this.http.post<any>(`${this.url}/${request.listId}/question`, body);
    }

    public updateQuestionsFromList(request: UpdateAssignmentRequest) {
        return this.http.put<any>(`${this.url}/${request.listId}/questions`, request);
    }

    public deleteQuestionFromList(request: DeleteQuestionFromListRequest) {
        return this.http.delete<any>(`${this.url}/${request.listId}/${request.questionId}`);
    }
}
