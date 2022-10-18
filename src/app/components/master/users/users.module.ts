import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './list/list.component';
import { UsersCrudComponent } from './crud/crud.component';
import { SharedModule } from 'src/app/common-modules/shared.module';
import { MaterialModule } from 'src/app/common-modules/material.module';

@NgModule({
  declarations: [UsersListComponent, UsersCrudComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, MaterialModule],
})
export class UsersModule {}
