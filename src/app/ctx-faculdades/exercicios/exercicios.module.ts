import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PrimeNGModule} from "../../prime-ng/prime-ng.module";
import {LibrariesModule} from "../../libraries/libraries.module";
import {EditarExercicioComponent, ListarExerciciosComponent} from "./pages";
import { CenariosdeTesteModule } from "../cenarios-de-teste/cenarios-de-teste.module";

const exports = [
    EditarExercicioComponent,
    ListarExerciciosComponent,
];

const imports = [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    LibrariesModule,
    CenariosdeTesteModule
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