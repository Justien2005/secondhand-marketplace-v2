import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.scss'
})
export class SellerDetailsComponent implements OnInit {

  seller: any;

  constructor() { }

  ngOnInit(): void {
    // Simulate fetching seller details
    this.seller = {
      seller_id: 1,
      name: 'Seller 1', 
      photo: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png',
      location: 'Location 1',
      description: 'This is a sample description for Seller 1.'
    }
  }

  onClickProductListing(): void {
    console.log('Navigating to product listing for seller:', this.seller.seller_id);
  }

}
