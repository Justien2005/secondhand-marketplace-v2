import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private api = environment.api;

  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  getSellerList() {
    return this.httpService.get(`${this.api}/sellers`);
  }

  getSellerDetail(id: number) {
    return this.httpService.get(`${this.api}/sellers/${id}`);
  }
}
