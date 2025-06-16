import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private api = environment.api;

  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  getProductCategories() {
    return this.httpService.get(`${this.api}/product-categories`);
  }

  getBuyerOrderList() {
    return this.httpService.get(`${this.api}/purchase`);
  }

  getAdminOrderList() {
    return this.httpService.get(`${this.api}/order-list`);
  }

  makePurchaseOrder(data: any) {
    return this.httpService.post(`${this.api}/purchase`, data);
  }

  makeBid(data: any) {
    return this.httpService.post(`${this.api}/bid`, data);
  }

  changeOrderStatus(data: any) {
    return this.httpService.post(`${this.api}/order-status`, data);
  }

  getOrderStatusOptions() {
    return this.httpService.get(`${this.api}/order-status-options`);
  }

}
