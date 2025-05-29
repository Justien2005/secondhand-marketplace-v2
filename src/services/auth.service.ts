// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User } from 'src/app/pages/model/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:5000';

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
}
