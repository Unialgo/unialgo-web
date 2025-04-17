import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: false,
    template: `<app-block /><router-outlet></router-outlet>`
})
export class AppComponent { }
