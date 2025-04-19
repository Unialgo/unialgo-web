import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: false,
    template: `<app-loading-overlay></app-loading-overlay><router-outlet></router-outlet>`
})
export class AppComponent { }
