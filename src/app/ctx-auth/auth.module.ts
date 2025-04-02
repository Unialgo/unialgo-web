import {NgModule} from "@angular/core";

import {PrimeNGModule} from "../prime-ng/prime-ng.module";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";
import {AppFloatingConfigurator} from "../ctx-layout/layout/component/app.floatingconfigurator.component";

const exports = [
    LoginComponent,
    SignUpComponent,
];

const imports = [
    PrimeNGModule
]

@NgModule({
    declarations: [
        ...exports
    ],
    imports: [
        ...imports,
        AppFloatingConfigurator
    ],
    exports: [
        ...exports
    ]
})
export class AuthModule { }