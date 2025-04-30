export interface Exercicio {
    id: string;
    userId: string;
    status: number;
    statusDesc?: string;
    title: string;
    statement: string;
}