import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { UiBasicModule } from 'src/app/demo/ui-elements/ui-basic/ui-basic.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-seller-list',
  imports: [TablesModule, UiBasicModule, SharedModule],
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss'
})
export class SellerListComponent implements OnInit {
  sellers: any[] = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sellers = [
      { seller_id: 1, name: 'Seller 1', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 1' },
      { seller_id: 2, name: 'Seller 2', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 2' },
      { seller_id: 3, name: 'Seller 3', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 3' },
      { seller_id: 4, name: 'Seller 4', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 4' },
      { seller_id: 5, name: 'Seller 5', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 5' }
    ];
  }

  onClickDetails(seller_id: number) {
    this.router.navigate(['/pages/seller/seller-details/' + seller_id]);
  }


}
