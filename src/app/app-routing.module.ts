import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './ctx-layout/pages/notfound/notfound.component';
import {AppLayout} from './ctx-layout/layout/component/app.layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
    ]
  },
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
