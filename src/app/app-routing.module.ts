import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskGuard } from './guards/task.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      { 
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
      },
      { 
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
      }
    ]
  },
  {
    path: 'pages',
    loadComponent: () => import('./pages/pages.component').then(c => c.PagesComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
          { 
            path: 'admin',
            loadComponent: () => import('./pages/dashboard/dashboard-admin/dashboard-admin.component').then(c => c.DashboardAdminComponent),
            canActivate: [TaskGuard],
            data: { permission: 'DASHBOARD_ADMIN' }
          },
          { 
            path: 'seller',
            loadComponent: () => import('./pages/dashboard/dashboard-seller/dashboard-seller.component').then(c => c.DashboardSellerComponent)
          },
          {
            path: 'buyer',
            loadComponent: () => import('./pages/dashboard/dashboard-buyer/dashboard-buyer.component').then(c => c.DashboardBuyerComponent)
          }
        ]
      },
      {
        path: 'product-admin',
        children: [
          {
            path: 'product-listing',
            loadComponent: () => import('./pages/product-admin/product-listing/product-listing.component').then(c => c.ProductListingComponent),
            canActivate: [TaskGuard],
            data: { permission: 'ADMIN_PRODUCT_LISTING' }
          },
          {
            path: 'product-seller/:seller_id',
            loadComponent: () => import('./pages/product-admin/product-seller/product-seller.component').then(c => c.ProductSellerComponent),
          },
        ]
      },
      {
        path: 'admin-order-list',
        children: [
          {
            path: 'list',
            loadComponent: () => import('./pages/admin-order-list/admin-order-list.component').then(c => c.AdminOrderListComponent),
            canActivate: [TaskGuard],
            data: { permission: 'ADMIN_ORDER_LIST' }
          },
        ]
      },
      {
        path: 'admin-setup',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/admin-setup/admin-setup.component').then(c => c.AdminSetupComponent),
            canActivate: [TaskGuard],
            data: { permission: 'ADMIN_SETUP' }
          },
        ]
      },
      {
        path: 'seller',
        children: [
          {
            path: 'seller-list',
            loadComponent: () => import('./pages/seller/seller-list/seller-list.component').then(c => c.SellerListComponent),
            canActivate: [TaskGuard],
            data: { permission: 'ADMIN_SELLER_LIST' }
          },
          {
            path: 'seller-details/:seller_id',
            loadComponent: () => import('./pages/seller/seller-details/seller-details.component').then(c => c.SellerDetailsComponent),
          }
        ]
      },
      {
        path: 'seller-pages',
        children: [
          {
            path: 'seller-product-list',
            loadComponent: () => import('./pages/seller-pages/seller-product-list/seller-product-list.component').then(c => c.SellerProductListComponent),
          },
          {
            path: 'seller-product-add',
            loadComponent: () => import('./pages/seller-pages/seller-product-add/seller-product-add.component').then(c => c.SellerProductAddComponent),
          },
        ]
      },
      {
        path: 'buyer-pages',
        children: [
          {
            path: 'product-catalog',
            loadComponent: () => import('./pages/buyer-pages/product-catalog/product-catalog.component').then(c => c.ProductCatalogComponent),
            canActivate: [TaskGuard],
            data: { permission: 'PRODUCT_CATALOG' }
          },
          {
            path: 'product-detail/:product_id',
            loadComponent: () => import('./pages/buyer-pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent),
          },
          {
            path: 'buyer-order',
            loadComponent: () => import('./pages/buyer-pages/buyer-order/buyer-order.component').then(c => c.BuyerOrderComponent),
          },
          {
            path: 'wishlist',
            loadComponent: () => import('./pages/buyer-pages/wishlist/wishlist.component').then(c => c.WishlistComponent),
          },
        ]
      },
    ]
  },
  // {
  //   path: 'unauthorized',
  //   loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent)
  // },
  // {
  //   path: '**',
  //   loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent)
  // }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: 'dashboard',
//         pathMatch: 'full'
//       },
//       {
//         path: 'dashboard',
//         loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DashboardComponent)
//       },
//       {
//         path: 'basic',
//         loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
//       },
//       {
//         path: 'forms',
//         loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
//       },
//       {
//         path: 'tables',
//         loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
//       },
//       {
//         path: 'apexchart',
//         loadComponent: () => import('./demo/pages/core-chart/apex-chart/apex-chart.component')
//       },
//       {
//         path: 'sample-page',
//         loadComponent: () => import('./demo/extra/sample-page/sample-page.component')
//       }
//     ]
//   },
//   {
//     path: '',
//     component: GuestComponent,
//     children: [
//       {
//         path: 'auth',
//         loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
//       }
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
