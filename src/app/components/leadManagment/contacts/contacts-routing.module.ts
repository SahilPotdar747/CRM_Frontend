import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsCrudComponent } from './crud/crud.component';
import { ContactsListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'add', component: ContactsCrudComponent },
  { path: 'edit/:id', component: ContactsCrudComponent },
  { path: 'list', component: ContactsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
