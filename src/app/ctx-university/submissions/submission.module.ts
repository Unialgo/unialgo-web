import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNGModule } from '../../prime-ng/prime-ng.module';
import { LibrariesModule } from '../../libraries/libraries.module';
import { CreateSubmissionComponent, ListSubmissionsComponent, ViewSubmissionComponent } from './pages';

const components: any[] = [];

const pages = [CreateSubmissionComponent, ListSubmissionsComponent, ViewSubmissionComponent];

const exports = [...components, ...pages];

const imports = [PrimeNGModule, FormsModule, ReactiveFormsModule, LibrariesModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class SubmissionModule {}