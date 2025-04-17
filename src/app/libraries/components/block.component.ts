import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-block',
    template: `<block-ui [message]="message">`,
    standalone: false
})
export class BlockComponent {
    @Input() message: string = 'Loading...';
}