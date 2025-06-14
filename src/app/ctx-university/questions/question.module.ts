import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNGModule } from '../../prime-ng/prime-ng.module';
import { TestCaseModule } from '../test-cases/test-case.module';
import { LibrariesModule } from '../../libraries/libraries.module';
import { SelectQuestionComponent } from './components';
import { CreateQuestionComponent, UpdateQuestionComponent, DeleteQuestionComponent, ListQuestionsComponent } from './pages';

const components = [SelectQuestionComponent];

const pages = [CreateQuestionComponent, UpdateQuestionComponent, DeleteQuestionComponent, ListQuestionsComponent];

const exports = [...components, ...pages];

const imports = [PrimeNGModule, FormsModule, ReactiveFormsModule, LibrariesModule, TestCaseModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class QuestionModule {}
