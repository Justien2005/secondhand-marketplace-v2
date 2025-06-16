import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private router: Router
  ) { }

  storeToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  storeAccess(access: any) {
    const data = JSON.parse(JSON.stringify(access));
    localStorage.setItem('user', data);
  }

  getUserAccess() {
    return JSON.parse(localStorage.getItem('user'));
  }

  storeRoles(roles: any) {
    const data = JSON.parse(JSON.stringify(roles));
    localStorage.setItem('roles', data);
  }

  getUserRoles() {
    return JSON.parse(localStorage.getItem('roles'));
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }
}
