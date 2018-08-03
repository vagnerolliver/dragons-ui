import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'cadastrar', component: FormComponent },
  { path: 'editar', component: FormComponent },
  { path: 'editar/:slug', component: FormComponent },
  { path: '**', component: ListComponent,   redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
