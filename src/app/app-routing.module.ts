import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './ctx-layout/pages/notfound/notfound.component';
import {AppLayout} from './ctx-layout/layout/component/app.layout.component';
import {LoginComponent} from './ctx-auth/pages/login/login.component';
import {SignUpComponent} from './ctx-auth/pages/sign-up/sign-up.component';
import {DashboardProfessorComponent} from './ctx-dashboards/pages/dashboard-professor/dashboard-professor.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {path: 'professor', component: DashboardProfessorComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: '/notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
