import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';
import { OrderService } from 'src/services/order.service';
import { ProductService } from 'src/services/product.service';
import { SettingService } from 'src/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  
  @ViewChild('buyModal', {static: true}) public modalBuy: NgbModalRef;
  @ViewChild('bidModal', {static: true}) public modalBid: NgbModalRef;
  @ViewChild('changePriceModal', {static: true}) public modalChangePrice: NgbModalRef;
  @ViewChild('cartModal', {static: true}) public modalCart: NgbModalRef;
  
  product: any;
  wishlist: any[] = [];
  productId: number;
  loading: boolean = false;
  quantityToBuy: number = 1;
  quantityToCart: number = 1;
  priceBid: number = 1;
  roles: any;
  adminFee: number;
  newPrice: number;
  productInWishlist: boolean = false;
  cart: any;
  buyerCart: any;
  productInCart: boolean = true;
  productDummyPhoto = 'assets/app-asset/dummy-product.png';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private settings: SettingService
  ) {
    this.productId = this.route.snapshot.params['product_id'];
    this.roles = this.settings.getUserRoles();
  }

  ngOnInit(): void {
    this.getProduct();
    this.getWishlist();
    this.getFee();
  }

  getProduct() {
    this.loading = true;
    this.productService.getProductDetail(this.productId).subscribe({
      next: (res: any) => {
        this.product = res.data;
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
    });
  }

  getFee() {
    this.productService.getAdminFees().subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.adminFee = res.data.admin_fees;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch admin fee.'
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to fetch admin fee.'
        });
      }
    });
  }

  onPurchase() {
    this.loading = true;
    if (this.quantityToBuy > this.product.stock) {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Stock',
        text: `Only ${this.product.stock} items available in stock.`,
      });
      this.modalService.dismissAll();
      return;
    }
    const order_products = [
      {
        product_id: this.productId,
        quantity: this.quantityToBuy,
        price: (this.product.price * this.quantityToBuy) + (this.product.price * this.quantityToBuy * this.adminFee / 100),
      }
    ];
    const params = {
      order_products: order_products,
      total_price: order_products.map(p => p.price).reduce((a, b) => a + b, 0),
    }
    this.orderService.makePurchaseOrder(params).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Purchase Successful',
          });
          this.modalService.dismissAll();
          this.getProduct();
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
        this.getProduct();
      },
    });
  }

  onBid() {
    const params = {
      product_id: this.productId,
      bid_price: this.priceBid,
    }
    this.orderService.makeBid(params).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Bid Successful',
          });
          this.modalService.dismissAll();
          this.getProduct();
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
        this.getProduct();
      },
    });
  }

  openBuyModal() {
    this.modalService.open(this.modalBuy, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop : 'static',
      size: 'lg'
    });
  }

  openBidModal() {
    this.modalService.open(this.modalBid, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop : 'static',
      size: 'lg'
    });
  }

  openModalChangePrice() {
    this.modalService.open(this.modalChangePrice, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop : 'static',
      size: 'lg'
    });
  }

  closeBuyModal() {
    // if (this.modalBuy) {
    //   this.modalBuy.close();
    // }
  }

  onChangePrice() {
    if (this.newPrice <= 0) {
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Price must be greater than zero.',
      });
      return;
    }
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change the price of this product to ${this.newPrice}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.changePrice();
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  changePrice() {
    const params = {
      product_id: this.productId,
      new_price: this.newPrice,
    }
    this.productService.changeProductPrice(params).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Price Updated Successfully',
          });
          this.modalService.dismissAll();
          this.getProduct();
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
        this.getProduct();
      },
    });
  }

  getWishlist() {
    this.productService.getBuyerWishlist().subscribe({
      next: (res: any) => {
        this.wishlist = res.data;
        this.productInWishlist = this.wishlist.some(item => +item.product_id === +this.productId);
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to load wishlist.'
        });
      }
    });
  }

  toggleWishlist() {
    let observable: any;
    if (this.productInWishlist) {
      observable = this.productService.deleteBuyerWishlist(this.productId);
    } else {
      observable = this.productService.addBuyerWishlist(this.productId);
    }
    observable.subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.productInWishlist = !this.productInWishlist;
          Swal.fire({
            icon: 'success',
            title: this.productInWishlist ? 'Added to Wishlist' : 'Removed from Wishlist',
          });
          this.getWishlist();
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to update wishlist.'
        });
      }
    });
  }

  getSafeImageUrl(dataUrl: string | null): SafeUrl | null {
    if (!dataUrl) return null;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }

  onAddToCart() {
    this.cart = {
      product_id: this.productId,
      quantity: this.quantityToCart,
    }
    this.productService.addBuyerCart(this.cart).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.modalService.dismissAll();
          this.getCartList();
          Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to add product into cart.'
        });
      }
    });
  }

  openCartModal() {
    this.modalService.open(this.modalCart, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop : 'static',
      size: 'lg'
    });
  }

  getCartList() {
    this.productService.getBuyerCart().subscribe({
      next: (res: any) => {
        this.buyerCart = res.data.map((item: any) => ({
          ...item,
          photoDataUrl: this.product.photoDataUrl,
          product_name: this.product.product_name,
          price: this.product.price,
        }));
        this.productInCart = this.buyerCart.some(item => +item.product_id === +this.productId);
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

}
