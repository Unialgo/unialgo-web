import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, interval, switchMap, takeUntil, filter, BehaviorSubject } from 'rxjs';

import { Submission, SubmissionService } from '../../../api/university';

export interface PollingSubmission {
    submissionId: string;
    intervalMs: number;
    maxAttempts: number;
    currentAttempts: number;
}

@Injectable({
    providedIn: 'root'
})
export class SubmissionPollingService implements OnDestroy {
    private destroy$ = new Subject<void>();
    private pollingSubmissions = new Map<string, PollingSubmission>();
    private submissionUpdates$ = new BehaviorSubject<Submission[]>([]);

    constructor(private submissionService: SubmissionService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.pollingSubmissions.clear();
    }

    /**
     * Start polling for a submission status
     * @param submissionId The submission ID to poll
     * @param intervalMs Polling interval in milliseconds (default: 3000)
     * @param maxAttempts Maximum number of polling attempts (default: 60)
     */
    startPolling(submissionId: string, intervalMs: number = 3000, maxAttempts: number = 60): void {
        // Don't start polling if already polling this submission
        if (this.pollingSubmissions.has(submissionId)) {
            return;
        }

        const pollingInfo: PollingSubmission = {
            submissionId,
            intervalMs,
            maxAttempts,
            currentAttempts: 0
        };

        this.pollingSubmissions.set(submissionId, pollingInfo);

        // Start the polling
        this.pollSubmission(pollingInfo);
    }

    /**
     * Stop polling for a specific submission
     * @param submissionId The submission ID to stop polling
     */
    stopPolling(submissionId: string): void {
        this.pollingSubmissions.delete(submissionId);
    }

    /**
     * Stop all polling operations
     */
    stopAllPolling(): void {
        this.pollingSubmissions.clear();
    }

    /**
     * Get observable for submission updates
     */
    getSubmissionUpdates(): Observable<Submission[]> {
        return this.submissionUpdates$.asObservable();
    }

    /**
     * Check if a submission is currently being polled
     */
    isPolling(submissionId: string): boolean {
        return this.pollingSubmissions.has(submissionId);
    }

    /**
     * Get the list of submissions currently being polled
     */
    getPollingSubmissions(): string[] {
        return Array.from(this.pollingSubmissions.keys());
    }

    private pollSubmission(pollingInfo: PollingSubmission): void {
        interval(pollingInfo.intervalMs)
            .pipe(
                takeUntil(this.destroy$),
                filter(() => this.pollingSubmissions.has(pollingInfo.submissionId)), // Continue only if still tracking
                switchMap(() => this.submissionService.updateSubmissionStatus(pollingInfo.submissionId))
            )
            .subscribe({
                next: (updatedSubmission) => {
                    // Update attempts counter
                    const currentPolling = this.pollingSubmissions.get(pollingInfo.submissionId);
                    if (currentPolling) {
                        currentPolling.currentAttempts++;
                    }

                    // Emit the updated submission
                    this.emitSubmissionUpdate(updatedSubmission);

                    // Stop polling if submission is finished or max attempts reached
                    if (this.isSubmissionFinished(updatedSubmission) || 
                        (currentPolling && currentPolling.currentAttempts >= currentPolling.maxAttempts)) {
                        this.stopPolling(pollingInfo.submissionId);
                    }
                },
                error: (error) => {
                    console.error(`Error polling submission ${pollingInfo.submissionId}:`, error);
                    
                    // Increment attempts even on error
                    const currentPolling = this.pollingSubmissions.get(pollingInfo.submissionId);
                    if (currentPolling) {
                        currentPolling.currentAttempts++;
                        
                        // Stop polling if max attempts reached
                        if (currentPolling.currentAttempts >= currentPolling.maxAttempts) {
                            this.stopPolling(pollingInfo.submissionId);
                        }
                    }
                }
            });
    }

    private isSubmissionFinished(submission: Submission): boolean {
        const processingStatuses = ['Pending', 'In Queue', 'Processing', 'Evaluating'];
        return !processingStatuses.includes(submission.status);
    }

    private emitSubmissionUpdate(submission: Submission): void {
        const currentSubmissions = this.submissionUpdates$.value;
        const existingIndex = currentSubmissions.findIndex(s => s.id === submission.id);
        
        let updatedSubmissions: Submission[];
        if (existingIndex >= 0) {
            // Update existing submission
            updatedSubmissions = [...currentSubmissions];
            updatedSubmissions[existingIndex] = submission;
        } else {
            // Add new submission
            updatedSubmissions = [...currentSubmissions, submission];
        }
        
        this.submissionUpdates$.next(updatedSubmissions);
    }
}