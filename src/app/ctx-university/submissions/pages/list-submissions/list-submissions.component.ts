import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { EntityListAbstract } from '../../../../libraries/abstracts';
import { Submission, SubmissionService, PageableResponse } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { SubmissionPollingService } from '../../services/submission-polling.service';

@Component({
    selector: 'ctx-university-list-submissions',
    templateUrl: 'list-submissions.component.html',
    standalone: false
})
export class ListSubmissionsComponent extends EntityListAbstract implements OnInit, OnDestroy {
    @ViewChild('dt') dt!: Table;

    submissions: Submission[] = [];
    selectedSubmission: Submission | null = null;
    selectedSubmissions: Submission[] = [];
    
    totalRecords: number = 0;
    rows: number = 10;
    currentPage: number = 0;
    loading: boolean = false;

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private submissionService: SubmissionService,
        private pollingService: SubmissionPollingService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.loadSubmissions();
        this.subscribeToPollingUpdates();
    }

    ngOnDestroy() {
        this.pollingService.stopAllPolling();
    }

    onClickReload(): void {
        this.currentPage = 0;
        this.loadSubmissions();
    }

    onClickCreate(): void {
        this.createVisible = true;
    }

    onCreateVisibleEvent(event: any): void {
        this.createVisible = false;
    }

    onCreateSuccessEvent(event: any): void {
        this.createVisible = false;
        this.onClickReload();
    }

    onCreateCancelationEvent(event: any): void {
        this.createVisible = false;
    }

    onClickView(submission: Submission) {
        this.selectedSubmission = submission;
        this.updateVisible = true; // Reusing updateVisible for view modal
    }

    onViewVisibleEvent(event: any): void {
        this.updateVisible = false;
        this.selectedSubmission = null;
    }

    onViewCancelationEvent(event: any): void {
        this.updateVisible = false;
        this.selectedSubmission = null;
    }

    onPageChange(event: any): void {
        this.currentPage = event.page;
        this.rows = event.rows;
        this.loadSubmissions();
    }

    onRefreshStatus(submission: Submission): void {
        this.block('Updating submission status...');
        this.submissionService.updateSubmissionStatus(submission.id).subscribe(
            (updatedSubmission) => {
                const index = this.submissions.findIndex(s => s.id === submission.id);
                if (index !== -1) {
                    this.submissions[index] = updatedSubmission;
                }
                this.unlock();
                this.notify(NotificationType.SUCCESS, undefined, 'Status updated successfully');
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
        switch (status) {
            case 'Accepted':
                return 'success';
            case 'Wrong Answer':
            case 'Compilation Error':
            case 'Runtime Error':
            case 'Time Limit Exceeded':
            case 'Memory Limit Exceeded':
                return 'danger';
            case 'Pending':
            case 'In Queue':
            case 'Processing':
            case 'Evaluating':
                return 'info';
            default:
                return 'warn';
        }
    }

    getScoreColor(score: number): string {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        if (score >= 50) return 'text-orange-600';
        return 'text-red-600';
    }

    isProcessing(status: string): boolean {
        return ['Pending', 'In Queue', 'Processing', 'Evaluating'].includes(status);
    }

    private loadSubmissions(): void {
        this.loading = true;
        this.block('Loading submissions...');
        
        this.submissionService.getUserSubmissions({
            page: this.currentPage,
            size: this.rows,
            sortBy: 'submissionDate',
            sortDirection: 'desc'
        }).subscribe(
            (response: PageableResponse<Submission>) => {
                this.submissions = response.content;
                this.totalRecords = response.totalElements;
                this.loading = false;
                this.unlock();
                
                // Start polling for submissions that are still processing
                this.startPollingForProcessingSubmissions();
            },
            (error) => {
                this.loading = false;
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }

    private subscribeToPollingUpdates(): void {
        this.pollingService.getSubmissionUpdates().subscribe(
            (updatedSubmissions) => {
                updatedSubmissions.forEach(updatedSubmission => {
                    const index = this.submissions.findIndex(s => s.id === updatedSubmission.id);
                    if (index !== -1) {
                        this.submissions[index] = updatedSubmission;
                    }
                });
            }
        );
    }

    private startPollingForProcessingSubmissions(): void {
        this.submissions.forEach(submission => {
            if (this.isProcessing(submission.status) && !this.pollingService.isPolling(submission.id)) {
                this.pollingService.startPolling(submission.id);
            }
        });
    }
}