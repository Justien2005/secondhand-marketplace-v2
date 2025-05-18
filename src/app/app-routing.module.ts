import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
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
