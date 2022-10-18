import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCrudComponent } from './crud/crud.component';
import { SharedModule } from 'src/app/common-modules/shared.module';

@NgModule({
  declarations: [ProfileCrudComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
