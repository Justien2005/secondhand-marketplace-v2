import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OrderService } from 'src/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buyer-order',
  imports: [CommonModule, SharedModule],
  templateUrl: './buyer-order.component.html',
  styleUrl: './buyer-order.component.scss'
})
export class BuyerOrderComponent implements OnInit {
  
  orders: any;
  selectedOrder: any | null = null;
  loading: boolean = false;

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  openDetailModal(content: any, order: any) {
    this.selectedOrder = order;
    this.modalService.open(content, { centered: true });
  }

  getOrderList() {
    this.loading = true;
    this.orderService.getBuyerOrderList().subscribe({
      next: (res: any) => {
        this.orders = res.data;
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
      },
    })
  }
}
