import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-seller',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-seller.component.html',
  styleUrl: './product-seller.component.scss'
})
export class ProductSellerComponent implements OnInit {
  products: any[] = [];
  sellerId: number;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {
    this.sellerId = +this.route.snapshot.params['seller_id'];
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productService.getProductBySeller(this.sellerId).subscribe({
      next: (res: any) => {
        this.products = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Failed to fetch products.'
        });
      }
    });
  }

  changeProductStatus(product: any, isApproved: boolean) {
    this.productService.changeProductApprovalStatus(product.product_id, isApproved).subscribe({
      next: () => {
        this.fetchProducts();
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Failed to change product status.'
        });
      }
    });
  }

  viewDetails(product: any) {
    this.router.navigate(['/pages/buyer-pages/product-detail', product.product_id]);
  }

  getSafeImageUrl(dataUrl: string | null): SafeUrl | null {
    if (!dataUrl) return null;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }
}
