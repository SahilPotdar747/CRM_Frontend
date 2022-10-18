import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileCrudComponent } from './crud/crud.component';

const routes: Routes = [
  { path: 'update/:id', component: ProfileCrudComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
