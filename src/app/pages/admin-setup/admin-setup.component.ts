import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-setup.component.html',
  styleUrl: './admin-setup.component.scss'
})
export class AdminSetupComponent implements OnInit {
  adminFee: number;
  feeSaved: boolean = false;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getFee();
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

  saveFee() {
    if (this.adminFee < 0 || this.adminFee > 100) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Fee',
        text: 'Admin fee must be between 0 and 100.'
      });
      return;
    }
    this.productService.changeAdminFees({new_fee: this.adminFee}).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Fee Updated',
            text: `New admin fee is set to ${this.adminFee}%`
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Failed to update fee.'
        });
      }
    });
    this.feeSaved = true;
  }
}
