import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent implements OnInit {

  @ViewChild('modalCart', {static: true}) public modalCart: NgbModalRef;
  
  products: any[] = [];
  loading: boolean = false;
  productDummyPhoto = 'assets/app-asset/dummy-product.png';
  cart: any[] = [
    // Demo cart data, replace with real cart logic
    { product_id: 1, product_name: 'Vintage Camera', price: 500000, quantity: 2, photoDataUrl: null },
    { product_id: 2, product_name: 'Retro Watch', price: 250000, quantity: 1, photoDataUrl: null }
  ];

  constructor(
    private router: Router,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProduct().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.getCartList();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
      },
    })
  }

  getSafeImageUrl(dataUrl: string | null): SafeUrl | null {
    if (!dataUrl) return null;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }

  onProductDetail(productId: number) {
    this.router.navigate(['pages/buyer-pages/product-detail/' + productId]);
  }

  onOpenCart() {
    this.modalService.open(this.modalCart, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      size: 'lg'
    });
  }

  get cartTotal(): number {
    return this.cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  }

  removeFromCart(cartId: number) {
    this.productService.deleteBuyerCart(cartId).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.getCartList();
        }
      }, error: (err: any) => {
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to remove item from cart.'
        });
      }
    });
  }

  getCartList() {
    this.productService.getBuyerCart().subscribe({
      next: (res: any) => {
        this.cart = res.data.map((item: any) => ({
          ...item,
          photoDataUrl: this.products.find(p => p.product_id === item.product_id)?.photoDataUrl || null,
          product_name: this.products.find(p => p.product_id === item.product_id)?.product_name || item.product_name,
          price: this.products.find(p => p.product_id === item.product_id)?.price || item.price,
        }));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to load cart.'
        });
      }
    });
  }

  checkOutAll() {
    this.productService.checkOutAllFromCart().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.modalService.dismissAll();
          this.getCartList();
          if (res.data.length === 0) {
            Swal.fire({
              icon: 'success',
              title: 'Checkout Successful',
              text: 'All items have been purchased successfully.'
            });
          } else if (res.data[0].product_id) {
            Swal.fire({
              icon: 'warning',
              title: 'Some Product Checkout Failed',
              text: `Failed to purchase some products: ${res.data.map((item: any) => item.product_name).join(', ')}`
            });
          }
        } else {
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: res.message || 'An error occurred during checkout.'
          });
        }
      }, error: (err) => {
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to checkout.'
        });
      }
    });
  }

}
