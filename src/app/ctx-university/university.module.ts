import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { TestCaseModule } from './test-cases/test-case.module';
import { AssignmentModule } from './assignments/assignment.module';
import { QuestionModule } from './questions/question.module';
import { SubmissionModule } from './submissions/submission.module';

const exports = [QuestionModule, TestCaseModule, AssignmentModule, SubmissionModule];

const imports = [PrimeNGModule, FormsModule, QuestionModule, TestCaseModule, AssignmentModule, SubmissionModule];

@NgModule({
    imports: [...imports],
    exports: [...exports]
})
export class UniversityModule {}
