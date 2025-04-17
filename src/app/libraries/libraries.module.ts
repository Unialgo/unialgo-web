import {NgModule} from "@angular/core";

import {BlockUIModule} from 'ng-block-ui';

import {BlockComponent} from "./components";

const exports = [
    BlockComponent
];

const imports: never[] = [
   
]

@NgModule({
    declarations: [
        ...exports
    ],
    imports: [
        ...imports,
        BlockUIModule.forRoot()
    ],
    exports: [
        ...exports,
        BlockUIModule
    ]
})
export class LibrariesModule { }