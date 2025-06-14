import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';

import { QuestionsService } from '../../../../api/university/questions/questions.service';

@Component({
    selector: 'ctx-university-select-question',
    templateUrl: './select-question.component.html',
    standalone: false
})
export class SelectQuestionComponent implements OnInit {
    @Output() onSelectEvent = new EventEmitter<any>();
    @ViewChild('dropdown') dropdown: AutoComplete;

    items: any[] = [];
    filteredItems: any[] = [];
    selectedItem?: any;

    constructor(private service: QuestionsService) {}

    ngOnInit(): void {
        this.getData();
    }

    onSelect(): void {
        if (this.selectedItem) {
            this.onSelectEvent.emit(this.selectedItem);
            this.dropdown.clear();
        }
    }

    private getData(): void {
        this.service.getAll().subscribe((res) => {
            res.forEach((i) => {
                this.items.push({ label: i.title, value: i });
            });
            this.filteredItems = this.items;
        });
    }

    filterItems(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.items as any[]).length; i++) {
            let item = (this.items as any[])[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }
}
