import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { UiBasicModule } from 'src/app/demo/ui-elements/ui-basic/ui-basic.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductService } from 'src/services/product.service';
import { SettingService } from 'src/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-product-list',
  imports: [TablesModule, UiBasicModule, SharedModule, CommonModule],
  templateUrl: './seller-product-list.component.html',
  styleUrl: './seller-product-list.component.scss'
})
export class SellerProductListComponent implements OnInit {
  products: any[] = [];
  sellerId: number;

  constructor(
    private router: Router,
    private productService: ProductService,
    private setting: SettingService
  ) {}

  ngOnInit(): void {
    this.getSellerId();
  }

  onAddProduct() {
    this.router.navigate(['/pages/seller-pages/seller-product-add']);
  }

  getSellerId() {
    this.sellerId = this.setting.getUserRoles().seller_id;
    this.getSellerProducts();
  }

  getSellerProducts() {
    this.productService.getProductBySeller(this.sellerId).subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
      },
    })
  }

  viewDetails(product: any) {
    this.router.navigate(['/pages/buyer-pages/product-detail', product.product_id]);
  }

}
