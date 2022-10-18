import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationCrudComponent } from './crud/crud.component';
import { OrganizationListComponent } from './list/list.component';
import { SharedModule } from 'src/app/common-modules/shared.module';
import { MaterialModule } from 'src/app/common-modules/material.module';


@NgModule({
  declarations: [
    OrganizationCrudComponent,
    OrganizationListComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class OrganizationModule { }
