import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private api = environment.api;

  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  getProductBySeller(sellerId: number) {
    return this.httpService.get(`${this.api}/product/${sellerId}`);
  }

  getProduct() {
    return this.httpService.get(`${this.api}/product`);
  }

  getAllProduct() {
    return this.httpService.get(`${this.api}/product-all`);
  }

  getProductDetail(productId: number) {
    return this.httpService.get(`${this.api}/product-detail/${productId}`);
  }

  getProductConditions() {
    return this.httpService.get(`${this.api}/product-conditions`);
  }

  getProductCategories() {
    return this.httpService.get(`${this.api}/product-categories`);
  }

  getBuyerWishlist() {
    return this.httpService.get(`${this.api}/wishlist`);
  }

  deleteBuyerWishlist(productId: number) {
    return this.httpService.get(`${this.api}/delete-wishlist/${productId}`);
  }

  addBuyerWishlist(productId: number) {
    return this.httpService.get(`${this.api}/wishlist/${productId}`);
  }

  saveSellerProduct(formData: FormData) {
    return this.httpService.post(`${this.api}/product-save`, formData);
  }

  changeProductApprovalStatus(productId: number, isApproved: boolean) {
    return this.httpService.post(`${this.api}/product-status/${productId}/${isApproved}`);
  }

  changeProductPrice(data: any) {
    return this.httpService.post(`${this.api}/product-price-change`, data);
  }

  changeAdminFees(data: any) {
    return this.httpService.post(`${this.api}/admin-fees`, data);
  }

  getAdminFees() {
    return this.httpService.get(`${this.api}/admin-fees`);
  }

  getBuyerCart() {
    return this.httpService.get(`${this.api}/cart`);
  }

  addBuyerCart(data: any) {
    return this.httpService.post(`${this.api}/cart`, data);
  }

  checkOutAllFromCart() {
    return this.httpService.get(`${this.api}/purchase-cart`);
  }

  deleteBuyerCart(cartId: number) {
    return this.httpService.get(`${this.api}/cart/${cartId}`,);
  }
}
