import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { AppNotificationComponent, LoadingOverlayComponent } from './components';
import { DateFormatPipe } from './pipes';

const components = [LoadingOverlayComponent, AppNotificationComponent];

const pipes = [DateFormatPipe];

const exports = [...components, ...pipes];

const imports = [CommonModule, PrimeNGModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class LibrariesModule {}
