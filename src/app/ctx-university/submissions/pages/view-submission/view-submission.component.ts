import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { BaseAbstract } from '../../../../libraries/abstracts';
import { Submission, SubmissionService } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';

@Component({
    selector: 'ctx-university-view-submission',
    templateUrl: 'view-submission.component.html',
    standalone: false
})
export class ViewSubmissionComponent extends BaseAbstract implements OnInit {
    @Input() visible: boolean = false;
    @Input() submission!: Submission;

    @Output() visibleEvent = new EventEmitter<boolean>();
    @Output() cancelationEvent = new EventEmitter<void>();

    detailedSubmission: Submission | null = null;
    loading: boolean = false;

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private submissionService: SubmissionService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        if (this.submission) {
            this.loadSubmissionDetails();
        }
    }

    onVisibleChange(visible: boolean): void {
        this.visible = visible;
        this.visibleEvent.emit(visible);
    }

    onCancel(): void {
        this.onVisibleChange(false);
        this.cancelationEvent.emit();
    }

    onRefreshStatus(): void {
        this.block('Updating submission status...');
        this.submissionService.updateSubmissionStatus(this.submission.id).subscribe(
            (updatedSubmission) => {
                this.detailedSubmission = updatedSubmission;
                this.submission = updatedSubmission; // Update parent component data
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

    formatTime(time: number | undefined): string {
        if (!time) return 'N/A';
        return `${time.toFixed(3)}s`;
    }

    formatMemory(memory: number | undefined): string {
        if (!memory) return 'N/A';
        return `${(memory / 1024).toFixed(2)} MB`;
    }

    private loadSubmissionDetails(): void {
        this.loading = true;
        this.submissionService.getById(this.submission.id, true).subscribe(
            (detailedSubmission) => {
                this.detailedSubmission = detailedSubmission;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.notify(NotificationType.ERROR, 'Failed to load submission details', error.message);
            }
        );
    }
}