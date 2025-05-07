import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {ExerciciosModule} from "./exercicios/exercicios.module";
import {CenariosdeTesteModule} from "./cenarios-de-teste/cenarios-de-teste.module";
import {QuestionListsModule} from "./question-lists/question-lists.module";

const exports = [
    ExerciciosModule,
    CenariosdeTesteModule,
    QuestionListsModule,
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ExerciciosModule,
    CenariosdeTesteModule,
    QuestionListsModule
]

@NgModule({
    imports: [
        ...imports
    ],
    exports: [
        ...exports
    ]
})
export class FaculdadesModule { }