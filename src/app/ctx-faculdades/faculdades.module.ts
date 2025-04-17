import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {ExerciciosModule} from "./exercicios/exercicios.module";

const exports = [
    ExerciciosModule
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ExerciciosModule
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