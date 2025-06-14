// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User } from 'src/app/pages/model/user.model';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;

  constructor(
    private httpService: HttpService
  ) {}

  login(data: User) {
    return this.httpService.post(`${this.api}/login`, data);
  }

  register(data: User) {
    return this.httpService.post(`${this.api}/register`, data);
  }

  verifyToken() {
    return this.httpService.get(`${this.api}/verify-token`);
  }

  roleList () {
    return this.httpService.get(`${this.api}/roles`);
  }
}
