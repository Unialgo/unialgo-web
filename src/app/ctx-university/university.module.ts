import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { TestCaseModule } from './test-cases/test-case.module';
import { AssigmentModule } from './assignments/assignment.module';
import { QuestionModule } from './questions/question.module';

const exports = [QuestionModule, TestCaseModule, AssigmentModule];

const imports = [PrimeNGModule, FormsModule, QuestionModule, TestCaseModule, AssigmentModule];

@NgModule({
    imports: [...imports],
    exports: [...exports]
})
export class UniversityModule {}
