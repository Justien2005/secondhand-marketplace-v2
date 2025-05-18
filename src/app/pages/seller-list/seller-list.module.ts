import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerListRoutingModule } from './seller-list-routing.module';
import { SellerListComponent } from './seller-list.component';


@NgModule({
  declarations: [SellerListComponent],
  imports: [
    CommonModule,
    SellerListRoutingModule
  ]
})
export class SellerListModule { }
