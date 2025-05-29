import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../theme/shared/components/breadcrumbs/breadcrumbs.component';
import { NavBarComponent } from '../theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from '../theme/layout/admin/navigation/navigation.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavBarComponent,
    NavigationComponent,
    BreadcrumbsComponent,
  ],
})
export class PagesModule { }
