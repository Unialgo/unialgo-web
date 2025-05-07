import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PrimeNGModule} from "../../prime-ng/prime-ng.module";
import {LibrariesModule} from "../../libraries/libraries.module";
import { CreateQuestionListComponent, DeleteQuestionListComponent, ListQuestionListComponent, UpdateQuestionComponent } from "./pages";

const exports = [
    CreateQuestionListComponent,
    UpdateQuestionComponent,
    DeleteQuestionListComponent,
    ListQuestionListComponent
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    LibrariesModule,
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
export class QuestionListsModule { }