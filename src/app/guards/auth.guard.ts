import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard activated');
    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) {
      // this.router.navigate(['/unauthorized']);
      // return false;
      return true;
    }
    return true;
  }
}
