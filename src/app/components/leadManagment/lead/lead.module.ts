import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadCrudComponent } from './crud/crud.component';
import { LeadListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/common-modules/material.module';
import { SharedModule } from 'src/app/common-modules/shared.module';
import { CustomeLeadComponent } from './custome-lead/custome-lead.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [LeadCrudComponent, LeadListComponent, CustomeLeadComponent],
  imports: [
    CommonModule,
    LeadRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    DragDropModule,
  ],
})
export class LeadModule {}
