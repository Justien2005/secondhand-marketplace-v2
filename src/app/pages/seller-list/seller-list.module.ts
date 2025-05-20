import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerListRoutingModule } from './seller-list-routing.module';
import { SellerListComponent } from './seller-list.component';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { UiBasicModule } from 'src/app/demo/ui-elements/ui-basic/ui-basic.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [SellerListComponent],
  imports: [
    CommonModule,
    SellerListRoutingModule,
    TablesModule,
    UiBasicModule,
    SharedModule
  ]
})
export class SellerListModule { }
