import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/common-modules/material.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsCrudComponent } from './crud/crud.component';
import { ContactsListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/common-modules/shared.module';

@NgModule({
  declarations: [ContactsCrudComponent, ContactsListComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class ContactsModule {}
