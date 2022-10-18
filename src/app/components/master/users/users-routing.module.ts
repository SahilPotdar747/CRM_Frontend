import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersCrudComponent } from './crud/crud.component';
import { UsersListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: UsersCrudComponent },
  { path: 'edit/:id', component: UsersCrudComponent },
  { path: 'list', component: UsersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
