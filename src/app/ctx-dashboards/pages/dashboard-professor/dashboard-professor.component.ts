import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard-professor',
    templateUrl: 'dashboard-professor.component.html',
    styleUrls: ['./dashboard-professor.component.scss'],
    standalone: false
})

export class DashboardProfessorComponent implements OnInit {
    currentDate: Date = new Date();
    username: string = 'User';
    questionsCreated: number = 37;

    private timer: any;

    constructor() { }

    ngOnInit() {
        this.timer = setInterval(() => {
            this.currentDate = new Date();
        }, 1000);
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}