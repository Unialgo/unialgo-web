export interface UpdateQuestionListRequest {
    listId: string;
    questions: { questionId: string; index: number }[];
}
