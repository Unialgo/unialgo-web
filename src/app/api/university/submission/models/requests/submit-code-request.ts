export interface SubmitCodeRequest {
    questionId: string;
    sourceCode: string;
    languageId: number;
    fileName?: string;
    mimeType?: string;
}

export interface SubmitCodeFileRequest {
    questionId: string;
    languageId: number;
    file: File;
}