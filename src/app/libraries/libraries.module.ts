import {NgModule} from "@angular/core";

import {BlockUIModule} from 'ng-block-ui';

import {LoadingOverlayComponent} from "./components";
import {CommonModule} from "@angular/common";

const exports = [
    LoadingOverlayComponent
];

const imports = [
   CommonModule
]

@NgModule({
    declarations: [
        ...exports
    ],
    imports: [
        ...imports,
    ],
    exports: [
        ...exports,
    ]
})
export class LibrariesModule { }