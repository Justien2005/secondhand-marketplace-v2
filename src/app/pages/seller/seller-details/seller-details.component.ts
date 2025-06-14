import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.scss'
})
export class SellerDetailsComponent implements OnInit {

  details: any;
  loading: boolean = true;
  sellerId: number;

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sellerId = this.route.snapshot.params['seller_id'];
    this.getSellerDetails();
  }

  getSellerDetails() {
    this.loading = true;
    this.sellerService.getSellerDetail(this.sellerId).subscribe({
      next: (res: any) => {
        this.details = res.data[0];
        this.loading = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error.error,
        });
        this.loading = false;
      },
    })
  }

  onClickProductListing(): void {
    this.router.navigate(['/pages/product-admin/product-seller/' + this.sellerId]);
  }

}
