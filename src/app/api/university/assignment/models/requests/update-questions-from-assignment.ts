export interface UpdateAssignmentRequest {
    listId: string;
    questions: { questionId: string; index: number }[];
}
