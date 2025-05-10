import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AIService {
    get url(): string {
        return `${environment.apiUrl}/ai`;
    }

    constructor(private http: HttpClient) { }

    generateStatement(dados: { title: string, context?: string }): Observable<{ statement: string }> {
        return this.http.post<{ statement: string }>(`${this.url}/gerar-enunciado`, {
            title: dados.title,
            context: dados.context || ""
        }).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error generating statement:', error);
                if (error.status === 401) {
                    console.error('Authentication error - Please login again');
                }
                return throwError(() => new Error(error.message || 'Failed to generate statement'));
            })
        );
    }
}
