import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupCrudComponent } from './group/crud/crud.component';
import { GroupListComponent } from './group/list/list.component';
import { RoleManagementCrudComponent } from './roleManagment/crud/crud.component';
import { RoleManagementListComponent } from './roleManagment/list/list.component';

const routes: Routes = [
  // role managment routing
  { path: 'role', component: RoleManagementListComponent },
  { path: 'role/add', component: RoleManagementCrudComponent },
  { path: 'role/edit/:id', component: RoleManagementCrudComponent },
  // group routing
  { path: 'group', component: GroupListComponent },
  { path: 'group/add', component: GroupCrudComponent },
  { path: 'group/edit/:id', component: GroupCrudComponent },

  // user module load
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule { }
