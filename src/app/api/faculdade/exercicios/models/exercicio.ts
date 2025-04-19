export interface Exercicio {
    id: string;
    userId: string;
    status: number;
    statusDesc?: string;
    titulo: string;
    enunciado: string;
}