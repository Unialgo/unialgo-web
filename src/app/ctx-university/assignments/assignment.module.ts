import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PrimeNGModule } from '../../prime-ng/prime-ng.module';
import { LibrariesModule } from '../../libraries/libraries.module';
import { QuestionModule } from '../questions/question.module';
import { ManageAssignmentQuestionsComponent } from './components';
import { CreateAssignmentComponent, DeleteAssignmentComponent, ListAssignmentComponent, UpdateQuestionComponent } from './pages';

const components = [ManageAssignmentQuestionsComponent];

const pages = [CreateAssignmentComponent, UpdateQuestionComponent, DeleteAssignmentComponent, ListAssignmentComponent];

const exports = [...components, ...pages];

const imports = [PrimeNGModule, FormsModule, ReactiveFormsModule, DragDropModule, LibrariesModule, QuestionModule];

@NgModule({
    declarations: [...exports],
    imports: [...imports],
    exports: [...exports]
})
export class AssignmentModule {}
