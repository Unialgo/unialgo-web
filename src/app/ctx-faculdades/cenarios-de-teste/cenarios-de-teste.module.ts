import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PrimeNGModule} from "../../prime-ng/prime-ng.module";
import {LibrariesModule} from "../../libraries/libraries.module";
import {AdicionarCenarioDeTesteComponent, EditarCenarioDeTesteComponent, ExcluirCenarioDeTesteComponent, ListarCenariosDeTesteComponent} from "./pages";

const exports = [
    AdicionarCenarioDeTesteComponent,
    EditarCenarioDeTesteComponent,
    ExcluirCenarioDeTesteComponent,
    ListarCenariosDeTesteComponent,
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
export class CenariosdeTesteModule { }