import {NgModule} from "@angular/core";

import {BlockUIModule} from 'ng-block-ui';

import {BlockComponent} from "./components";

const exports = [
    BlockComponent
];

const imports = [
    BlockUIModule.forRoot()
]

@NgModule({
    declarations: [
        ...exports
    ],
    imports: [
        ...imports
    ],
    exports: [
        ...exports
    ]
})
export class LibrariesModule { }