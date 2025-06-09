import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { AppNotificationComponent, LoadingOverlayComponent, MonacoCodeEditorComponent } from './components';
import { DateFormatPipe } from './pipes';

const components = [LoadingOverlayComponent, AppNotificationComponent, MonacoCodeEditorComponent];

const pipes = [DateFormatPipe];

const exports = [...components, ...pipes];

const imports = [CommonModule, FormsModule, MonacoEditorModule, PrimeNGModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class LibrariesModule {}
