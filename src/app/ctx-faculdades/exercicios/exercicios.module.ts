import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {ListarExerciciosComponent} from "./pages";
import {PrimeNGModule} from "../../prime-ng/prime-ng.module";

const exports = [
    ListarExerciciosComponent
];

const imports = [
    PrimeNGModule,
    FormsModule
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
export class ExerciciosModule { }