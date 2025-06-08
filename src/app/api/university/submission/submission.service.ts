import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Submission, SubmitCodeRequest, SubmitCodeFileRequest } from './models';
import { environment } from '../../../../environments/environment';

export interface PageableResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
}

export interface SubmissionQuery {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    userId?: string;
    questionId?: string;
    includeSourceCode?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SubmissionService {
    get url(): string {
        return `${environment.apiUrl}/submissions`;
    }

    constructor(private http: HttpClient) {}

    public submitCode(request: SubmitCodeRequest): Observable<Submission> {
        return this.http.post<Submission>(`${this.url}`, request);
    }

    public submitCodeFile(request: SubmitCodeFileRequest): Observable<Submission> {
        const formData = new FormData();
        formData.append('questionId', request.questionId);
        formData.append('languageId', request.languageId.toString());
        formData.append('file', request.file);

        return this.http.post<Submission>(`${this.url}/upload`, formData);
    }

    public getById(submissionId: string, includeSourceCode: boolean = false): Observable<Submission> {
        const params = new HttpParams().set('includeSourceCode', includeSourceCode.toString());
        return this.http.get<Submission>(`${this.url}/${submissionId}`, { params });
    }

    public getUserSubmissions(query: SubmissionQuery = {}): Observable<PageableResponse<Submission>> {
        let params = new HttpParams();
        
        if (query.page !== undefined) params = params.set('page', query.page.toString());
        if (query.size !== undefined) params = params.set('size', query.size.toString());
        if (query.sortBy) params = params.set('sortBy', query.sortBy);
        if (query.sortDirection) params = params.set('sortDirection', query.sortDirection);
        if (query.userId) params = params.set('userId', query.userId);

        return this.http.get<PageableResponse<Submission>>(`${this.url}/user`, { params });
    }

    public getQuestionSubmissions(questionId: string, query: SubmissionQuery = {}): Observable<PageableResponse<Submission>> {
        let params = new HttpParams();
        
        if (query.page !== undefined) params = params.set('page', query.page.toString());
        if (query.size !== undefined) params = params.set('size', query.size.toString());

        return this.http.get<PageableResponse<Submission>>(`${this.url}/question/${questionId}`, { params });
    }

    public getUserQuestionSubmissions(userId: string, questionId: string, query: SubmissionQuery = {}): Observable<PageableResponse<Submission>> {
        let params = new HttpParams();
        
        if (query.page !== undefined) params = params.set('page', query.page.toString());
        if (query.size !== undefined) params = params.set('size', query.size.toString());

        return this.http.get<PageableResponse<Submission>>(`${this.url}/user/${userId}/question/${questionId}`, { params });
    }

    public getLatestSubmission(userId: string, questionId: string): Observable<Submission> {
        return this.http.get<Submission>(`${this.url}/user/${userId}/question/${questionId}/latest`);
    }

    public getBestSubmission(userId: string, questionId: string): Observable<Submission> {
        return this.http.get<Submission>(`${this.url}/user/${userId}/question/${questionId}/best`);
    }

    public updateSubmissionStatus(submissionId: string): Observable<Submission> {
        return this.http.put<Submission>(`${this.url}/${submissionId}/status`, {});
    }
}