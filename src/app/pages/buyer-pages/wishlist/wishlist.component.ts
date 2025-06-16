import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  loading = false;
  productDummyPhoto = 'assets/app-asset/dummy-product.png';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this.loading = true;
    this.productService.getBuyerWishlist().subscribe({
      next: (res: any) => {
        this.wishlist = res.data;
        this.loading = false;
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to load wishlist.'
        });
        this.loading = false;
      }
    });
  }

  onDetail(productId: number) {
    this.router.navigate(['/pages/buyer-pages/product-detail/', productId]);
  }

  removeWishlist(productId: number) {
    this.productService.deleteBuyerWishlist(productId).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Removed from Wishlist',
            });
            this.getWishlist();
          }
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message || 'Failed to remove wishlist.'
          });
        }
      });
    }

}
