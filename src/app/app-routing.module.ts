import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './api/auth';
import { LoginComponent } from './ctx-auth/pages/login/login.component';
import { ListQuestionsComponent } from './ctx-university/questions/pages';
import { SignUpComponent } from './ctx-auth/pages/sign-up/sign-up.component';
import { AppLayout } from './ctx-layout/layout/component/app.layout.component';
import { ListQuestionListComponent } from './ctx-university/question-lists/pages';
import { NotFoundComponent } from './ctx-layout/pages/notfound/notfound.component';
import { DashboardProfessorComponent } from './ctx-dashboards/pages/dashboard-professor/dashboard-professor.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboards',
                children: [{ path: 'professor', component: DashboardProfessorComponent }]
            },
            {
                path: 'faculdades',
                children: [
                    { path: 'exercicios', component: ListQuestionsComponent },
                    { path: 'lists', component: ListQuestionListComponent }
                ]
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
