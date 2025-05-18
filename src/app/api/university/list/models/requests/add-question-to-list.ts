export interface AddQuestionToListRequest {
    listId: string;
    question: { questionId: string; index: number };
}
