import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { NotificationType } from '../../../../libraries/enums';
import { ModalBaseAbstract } from '../../../../libraries/abstracts';
import { Question, QuestionsService, Submission, SubmissionService, SubmitCodeFileRequest, SUPPORTED_LANGUAGES, Language } from '../../../../api/university';
import { LoadingService } from '../../../../ctx-layout/layout/service/loading.service';
import { SubmissionPollingService } from '../../services/submission-polling.service';

@Component({
    selector: 'ctx-university-create-submission',
    templateUrl: 'create-submission.component.html',
    standalone: false
})
export class CreateSubmissionComponent extends ModalBaseAbstract implements OnInit {
    @Input() override visible: boolean = false;
    @Input() questionId?: string;

    @Output() override visibleEvent = new EventEmitter<boolean>();
    @Output() override successEvent = new EventEmitter<Submission>();
    @Output() override cancelationEvent = new EventEmitter<void>();
    questions: Question[] = [];
    languages: Language[] = SUPPORTED_LANGUAGES;
    selectedFile: File | null = null;
    
    submissionMethod: 'file' | 'code' = 'file';

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        fb: FormBuilder,
        private submissionService: SubmissionService,
        private questionsService: QuestionsService,
        private pollingService: SubmissionPollingService
    ) {
        super(messageService, loadingService, fb);
        this.initializeForm();
    }

    ngOnInit() {
        this.loadQuestions();
        if (this.questionId) {
            this.form.patchValue({ questionId: this.questionId });
        }
    }

    onVisibleChange(visible: boolean): void {
        this.visible = visible;
        this.visibleEvent.emit(visible);
        if (!visible) {
            this.resetForm();
        }
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.markFormGroupTouched();
            return;
        }

        if (this.submissionMethod === 'file') {
            this.submitFile();
        } else {
            this.submitCode();
        }
    }

    onCancel(): void {
        this.onVisibleChange(false);
        this.cancelationEvent.emit();
    }

    onFileSelect(event: any): void {
        const file = event.files[0];
        if (file) {
            this.selectedFile = file;
            this.autoDetectLanguage(file.name);
        }
    }

    onFileRemove(): void {
        this.selectedFile = null;
    }

    onMethodChange(method: 'file' | 'code'): void {
        this.submissionMethod = method;
        this.form.get('sourceCode')?.clearValidators();
        
        if (method === 'code') {
            this.form.get('sourceCode')?.setValidators([Validators.required]);
            this.selectedFile = null;
        }
        
        this.form.get('sourceCode')?.updateValueAndValidity();
    }

    private initializeForm(): void {
        this.form = this.formBuilder.group({
            questionId: ['', Validators.required],
            languageId: ['', Validators.required],
            sourceCode: ['']
        });
    }

    private loadQuestions(): void {
        this.questionsService.getAll().subscribe(
            (questions) => {
                this.questions = questions;
            },
            (error) => {
                this.notify(NotificationType.ERROR, 'Failed to load questions', error.message);
            }
        );
    }

    private submitFile(): void {
        if (!this.selectedFile) {
            this.notify(NotificationType.ERROR, 'Please select a file');
            return;
        }

        const request: SubmitCodeFileRequest = {
            questionId: this.form.value.questionId,
            languageId: this.form.value.languageId,
            file: this.selectedFile
        };

        this.block('Submitting code...');
        this.submissionService.submitCodeFile(request).subscribe(
            (submission) => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Code submitted successfully');
                
                // Start polling if submission is processing
                if (this.isProcessing(submission.status)) {
                    this.pollingService.startPolling(submission.id);
                }
                
                this.successEvent.emit(submission);
                this.onVisibleChange(false);
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, 'Submission failed', error.message);
            }
        );
    }

    private submitCode(): void {
        const request = {
            questionId: this.form.value.questionId,
            sourceCode: this.form.value.sourceCode,
            languageId: this.form.value.languageId
        };

        this.block('Submitting code...');
        this.submissionService.submitCode(request).subscribe(
            (submission) => {
                this.unlock();
                this.notify(NotificationType.SUCCESS, 'Code submitted successfully');
                
                // Start polling if submission is processing
                if (this.isProcessing(submission.status)) {
                    this.pollingService.startPolling(submission.id);
                }
                
                this.successEvent.emit(submission);
                this.onVisibleChange(false);
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, 'Submission failed', error.message);
            }
        );
    }

    private autoDetectLanguage(fileName: string): void {
        const extension = fileName.toLowerCase().substr(fileName.lastIndexOf('.'));
        const language = this.languages.find(lang => lang.extension === extension);
        
        if (language) {
            this.form.patchValue({ languageId: language.id });
        }
    }

    private resetForm(): void {
        this.form.reset();
        this.selectedFile = null;
        this.submissionMethod = 'file';
        if (this.questionId) {
            this.form.patchValue({ questionId: this.questionId });
        }
    }

    private markFormGroupTouched(): void {
        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            control?.markAsTouched();
        });
    }

    private isProcessing(status: string): boolean {
        return ['Pending', 'In Queue', 'Processing', 'Evaluating'].includes(status);
    }
}