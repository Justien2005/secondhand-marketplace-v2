import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./dashboard-admin/dashboard-admin.component').then(
            (m) => m.DashboardAdminComponent
          ),
      },
      {
        path: 'seller',
        loadComponent: () =>
          import('./dashboard-seller/dashboard-seller.component').then(
            (m) => m.DashboardSellerComponent
          ),
      },
      {
        path: 'buyer',
        loadComponent: () =>
          import('./dashboard-buyer/dashboard-buyer.component').then(
            (m) => m.DashboardBuyerComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
