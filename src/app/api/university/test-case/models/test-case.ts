export interface TestCase {
    id: string;
    code: string;
    questionId: string;
    status: number;
    statusDesc?: string;
    input: any;
    output: any;
}