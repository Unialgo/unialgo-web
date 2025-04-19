import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {ExerciciosModule} from "./exercicios/exercicios.module";
import {CenariosdeTesteModule} from "./cenarios-de-teste/cenarios-de-teste.module";

const exports = [
    ExerciciosModule
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ExerciciosModule,
    CenariosdeTesteModule
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