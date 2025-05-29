import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardSellerComponent } from './dashboard-seller/dashboard-seller.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
