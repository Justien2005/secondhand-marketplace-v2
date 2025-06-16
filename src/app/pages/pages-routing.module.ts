import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'product-listing',
        loadChildren: () => import('./product-admin/product-seller/product-listing/product-listing.module').then(m => m.ProductListingModule),
      },
      {
        path: 'seller-list',
        loadChildren: () => import('./seller/seller-list/seller-list.module').then(m => m.SellerListModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
