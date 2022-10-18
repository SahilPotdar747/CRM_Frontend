/*
    creating navigation in this file 
    also added lazy loading concept 
    below with loadchildren properties
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/dashboard/home/home.component';

const routes: Routes = [
  // blank redirection
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // blank router redirected to dashboard
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  }, // auth redirect..

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      }, // dashboard redirect..
      {
        path: 'organization',
        loadChildren: () =>
          import(
            './components/leadManagment/organization/organization.module'
          ).then((m) => m.OrganizationModule),
        canActivate: [AuthGuard],
      }, // organization redirect..
      {
        path: 'contacts',
        loadChildren: () =>
          import('./components/leadManagment/contacts/contacts.module').then(
            (m) => m.ContactsModule
          ),
        canActivate: [AuthGuard],
      }, // contacts redirect..
      {
        path: 'master',
        loadChildren: () =>
          import('./components/master/master.module').then(
            (m) => m.MasterModule
          ),
        canActivate: [AuthGuard],
      }, // master redirect..

      {
        path: 'lead',
        loadChildren: () =>
          import('./components/leadManagment/lead/lead.module').then(
            (m) => m.LeadModule
          ),
        canActivate: [AuthGuard],
      },
      // profile module imported
      {
        path: 'profile',
        loadChildren: () =>
          import('./components/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  // Wildcard route if url doesnt match with routes..
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
