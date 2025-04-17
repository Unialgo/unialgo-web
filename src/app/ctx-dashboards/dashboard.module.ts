import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {DashboardProfessorComponent} from "./pages/dashboard-professor/dashboard-professor.component";

const exports = [
    DashboardProfessorComponent
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
export class DashboardModule { }