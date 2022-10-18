import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { RoleManagementCrudComponent } from './roleManagment/crud/crud.component';
import { RoleManagementListComponent } from './roleManagment/list/list.component';
import { SharedModule } from 'src/app/common-modules/shared.module';
import { GroupCrudComponent } from './group/crud/crud.component';
import { GroupListComponent } from './group/list/list.component';

@NgModule({
  declarations: [RoleManagementCrudComponent, RoleManagementListComponent, GroupCrudComponent, GroupListComponent],
  imports: [CommonModule, SharedModule, MasterRoutingModule],
})
export class MasterModule {}
