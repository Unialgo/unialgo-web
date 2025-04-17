import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {EditarExercicioComponent, ListarExerciciosComponent} from "./pages";
import {PrimeNGModule} from "../../prime-ng/prime-ng.module";

const exports = [
    EditarExercicioComponent,
    ListarExerciciosComponent
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule
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