import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ctx-university-manage-assignment-questions',
    templateUrl: './manage-assignment-questions.component.html',
    styleUrls: ['./manage-assignment-questions.component.scss'],
    standalone: false
})
export class ManageAssignmentQuestionsComponent {
    @Input() list: any[] = [];
    @Output() onAddQuestionToListEvent = new EventEmitter<any>();
    @Output() onDeleteQuestionFromListEvent = new EventEmitter<any>();
    @Output() onChangeListEvent = new EventEmitter<any[]>();

    constructor() {}

    onSelectQuestion(question: any) {
        if (!this.list.includes(question)) {
            this.list.push(question);
            let index = this.list.indexOf(question)
            this.onAddQuestionToListEvent.emit({...question, index: index})
        }
    }

    onClickRemove(index: any) {
        let deletedQuestion = this.list.splice(index, 1);
        this.onDeleteQuestionFromListEvent.emit(deletedQuestion[0])
    }

    onDragAndDrop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.list, event.previousIndex, event.currentIndex);
        this.onChangeListEvent.emit(this.list)
    }
}
