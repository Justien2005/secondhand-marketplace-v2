import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { UiBasicModule } from 'src/app/demo/ui-elements/ui-basic/ui-basic.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SellerService } from 'src/services/seller.service';
import Swal from 'sweetalert2';

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
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    this.getSellers();
  }

  onClickDetails(seller_id: number) {
    this.router.navigate(['/pages/seller/seller-details/' + seller_id]);
  }

  onSellerProducts(seller_id: number) {
    this.router.navigate(['/pages/product-admin/product-seller/' + seller_id]);
  }

  getSellers() {
    this.sellerService.getSellerList().subscribe({
      next: (res: any) => {
        this.sellers = res.data;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error.error,
        });
      },
    })
  }


}
