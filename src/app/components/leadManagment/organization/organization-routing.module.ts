import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationCrudComponent } from './crud/crud.component';
import { OrganizationListComponent } from './list/list.component';

const routes: Routes = [
  {path:'',component:OrganizationCrudComponent},
  {path:'edit/:id',component:OrganizationCrudComponent},
  {path:'list',component:OrganizationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
