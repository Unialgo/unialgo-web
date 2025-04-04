import {NgModule} from "@angular/core";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {DashboardProfessorComponent} from "./pages/dashboard-professor/dashboard-professor.component";
import {FormsModule} from "@angular/forms";

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