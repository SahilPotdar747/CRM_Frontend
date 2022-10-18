import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadCrudComponent } from './crud/crud.component';
import { CustomeLeadComponent } from './custome-lead/custome-lead.component';
import { LeadListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'add', component: LeadCrudComponent },
  { path: 'edit/:id', component: LeadCrudComponent },
  { path: 'list', component: LeadListComponent },
  { path: 'custome', component: CustomeLeadComponent },
  { path: 'custome/:id', component: CustomeLeadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadRoutingModule {}
