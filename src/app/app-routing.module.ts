import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './api/auth';
import { LoginComponent } from './ctx-auth/pages/login/login.component';
import { SignUpComponent } from './ctx-auth/pages/sign-up/sign-up.component';
import { ListarExerciciosComponent } from './ctx-faculdades/exercicios/pages';
import { AppLayout } from './ctx-layout/layout/component/app.layout.component';
import { NotFoundComponent } from './ctx-layout/pages/notfound/notfound.component';
import { DashboardProfessorComponent } from './ctx-dashboards/pages/dashboard-professor/dashboard-professor.component';
import { ListQuestionListComponent } from './ctx-faculdades/question-lists/pages/list-question-list/list-question-list.component';

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
                    { path: 'exercicios', component: ListarExerciciosComponent },
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
