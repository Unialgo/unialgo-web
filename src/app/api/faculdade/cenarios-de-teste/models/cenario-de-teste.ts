export interface CenarioDeTeste {
    id: string;
    codigo: string;
    exercicioId: string;
    status: number;
    statusDesc?: string;
    input: any;
    output: any;
}