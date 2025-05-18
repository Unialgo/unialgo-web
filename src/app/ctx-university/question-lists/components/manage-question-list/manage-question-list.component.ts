import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ctx-university-manage-question-list',
    templateUrl: './manage-question-list.component.html',
    styleUrls: ['./manage-question-list.component.scss'],
    standalone: false
})
export class ManageQuestionListComponent {
    @Input() list: any[] = [];
    @Output() onAddQuestionToListEvent = new EventEmitter<any>();
    @Output() onDeleteQuestionFromListEvent = new EventEmitter<any>();
    @Output() onChangeListEvent = new EventEmitter<any[]>();

    constructor() {}

    onSelectQuestion(question: any) {
        if (!this.list.includes(question)) {
            this.list.push(question);
            this.onAddQuestionToListEvent.emit(this.list.find(o => o.id == question.id))
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
