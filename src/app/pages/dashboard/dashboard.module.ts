import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardSellerComponent } from './dashboard-seller/dashboard-seller.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';


@NgModule({
  declarations: [DashboardComponent, DashboardAdminComponent, DashboardSellerComponent, DashboardBuyerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
