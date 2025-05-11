export interface Question {
    id: string;
    userId: string;
    status: number;
    statusDesc?: string;
    title: string;
    statement: string;
}