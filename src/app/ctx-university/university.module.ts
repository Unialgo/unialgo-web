import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { TestCaseModule } from './test-cases/test-case.module';
import { QuestionListsModule } from './question-lists/question-lists.module';
import { QuestionModule } from './questions/question.module';

const exports = [QuestionModule, TestCaseModule, QuestionListsModule];

const imports = [PrimeNGModule, FormsModule, QuestionModule, TestCaseModule, QuestionListsModule];

@NgModule({
    imports: [...imports],
    exports: [...exports]
})
export class UniversityModule {}
