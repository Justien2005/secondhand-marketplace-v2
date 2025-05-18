import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { BreadcrumbsComponent } from '../theme/shared/components/breadcrumbs/breadcrumbs.component';
import { NavBarComponent } from '../theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from '../theme/layout/admin/navigation/navigation.component';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    NavBarComponent,
    NavigationComponent,
    BreadcrumbsComponent,
  ]
})
export class PagesModule { }
