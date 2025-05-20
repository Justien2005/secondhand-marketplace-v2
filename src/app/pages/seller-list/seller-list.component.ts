import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-list',
  standalone: false,
  
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss'
})
export class SellerListComponent implements OnInit {
  sellers: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.sellers = [
      { seller_id: 1, name: 'Seller 1', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 1' },
      { seller_id: 2, name: 'Seller 2', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 2' },
      { seller_id: 3, name: 'Seller 3', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 3' },
      { seller_id: 4, name: 'Seller 4', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 4' },
      { seller_id: 5, name: 'Seller 5', photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png', location: 'Location 5' }
    ];
  }


}
