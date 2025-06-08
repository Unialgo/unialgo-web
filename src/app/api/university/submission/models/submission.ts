export interface Submission {
    id: string;
    userId: string;
    userEmail: string;
    questionId: string;
    questionTitle: string;
    languageId: number;
    languageName: string;
    status: SubmissionStatus;
    stdout?: string;
    stderr?: string;
    compileOutput?: string;
    message?: string;
    exitCode?: number;
    time?: number;
    wallTime?: number;
    memory?: number;
    testCasesPassed: number;
    totalTestCases: number;
    score: number;
    submissionDate: string;
    finishedAt?: string;
    sourceCode?: string;
}

export enum SubmissionStatus {
    PENDING = 'Pending',
    IN_QUEUE = 'In Queue',
    PROCESSING = 'Processing',
    EVALUATING = 'Evaluating',
    ACCEPTED = 'Accepted',
    WRONG_ANSWER = 'Wrong Answer',
    TIME_LIMIT_EXCEEDED = 'Time Limit Exceeded',
    COMPILATION_ERROR = 'Compilation Error',
    RUNTIME_ERROR = 'Runtime Error',
    RUNTIME_ERROR_SIGKILL = 'Runtime Error (SIGKILL)',
    RUNTIME_ERROR_SIGFPE = 'Runtime Error (SIGFPE)',
    RUNTIME_ERROR_SIGSEGV = 'Runtime Error (SIGSEGV)',
    RUNTIME_ERROR_SIGXFSZ = 'Runtime Error (SIGXFSZ)',
    RUNTIME_ERROR_SIGABRT = 'Runtime Error (SIGABRT)',
    RUNTIME_ERROR_NZEC = 'Runtime Error (NZEC)',
    RUNTIME_ERROR_OTHER = 'Runtime Error (Other)',
    INTERNAL_ERROR = 'Internal Error',
    EXEC_FORMAT_ERROR = 'Exec Format Error',
    MEMORY_LIMIT_EXCEEDED = 'Memory Limit Exceeded',
    OUTPUT_LIMIT_EXCEEDED = 'Output Limit Exceeded'
}

export interface Language {
    id: number;
    name: string;
    extension: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
    { id: 50, name: 'C (GCC 9.2.0)', extension: '.c' },
    { id: 54, name: 'C++ (GCC 9.2.0)', extension: '.cpp' },
    { id: 62, name: 'Java (OpenJDK 13.0.1)', extension: '.java' },
    { id: 71, name: 'Python (3.8.1)', extension: '.py' },
    { id: 63, name: 'JavaScript (Node.js 12.14.0)', extension: '.js' }
];