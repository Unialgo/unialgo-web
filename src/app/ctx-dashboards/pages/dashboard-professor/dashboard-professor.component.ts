import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-professor',
    templateUrl: 'dashboard-professor.component.html',
    styleUrls: ['./dashboard-professor.component.scss'],
    standalone: false
})

export class DashboardProfessorComponent implements OnInit {
    currentDate = new Date();
    username = 'User';
    exercisesCreated = 37;

    constructor() { }

    ngOnInit() { }
}