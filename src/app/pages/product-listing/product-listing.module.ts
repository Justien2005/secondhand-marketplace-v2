import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductListingComponent } from './product-listing.component';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ProductListingRoutingModule,
    TablesModule,
    SharedModule
  ]
})
export class ProductListingModule { }
