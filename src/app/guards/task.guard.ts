import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class TaskGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermission = route.data['permission'];
    const role = JSON.parse(localStorage.getItem('roles') || '{}');
    const permissions: string[] = role.permissions || [];
    if (permissions.includes(requiredPermission)) {
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'You do not have permission to access this page.',
    });
    this.router.navigate(['/pages/dashboard']);
    return false;
  }
}
