import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'ctx-university-manage-question-list',
    templateUrl: './manage-question-list.component.html',
    styleUrls: ['./manage-question-list.component.scss'],
    standalone: false
})
export class ManageQuestionListComponent {
    @Input() list: any[] = [];

    constructor() {}

    onSelectQuestion(question: any) {
        if (!this.list.includes(question)) {
            this.list.push(question);
        }
    }

    onDragAndDrop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    }

    onClickRemove(index: any) {
        this.list.splice(index, 1);
    }
}
