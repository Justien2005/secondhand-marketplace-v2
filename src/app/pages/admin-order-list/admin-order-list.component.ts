import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order.service';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-order-list',
  imports: [SharedModule, TablesModule, FormsModule],
  templateUrl: './admin-order-list.component.html',
  styleUrl: './admin-order-list.component.scss',
  standalone: true
})
export class AdminOrderListComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;
  expandedOrderId: number | null = null;
  statusOptions: any[] = [];
  formGroup: FormGroup;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getStatusOptions();
    this.getOrders();
    this.initForm();
  }
  
  initForm() {
    this.formGroup = new FormGroup({
      order_status_id: new FormControl(null),
      order_id: new FormControl(null),
    });
  }

  getStatusOptions() {
    this.orderService.getOrderStatusOptions().subscribe({
      next: (res: any) => {
        this.statusOptions = res.data || [];
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Failed to fetch status options.'
        });
      }
    });
  }

  getOrders() {
    this.loading = true;
    this.orderService.getAdminOrderList().subscribe({
      next: (res: any) => {
        this.orders = (res.data || []).map((order: any) => ({
          ...order,
          selected_status_id: order.order_status_id
        }));
        console.log(this.orders);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Failed to fetch orders.'
        });
      }
    });
  }

  toggleOrderItems(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  saveOrderStatus(order: any) {
    this.orderService.changeOrderStatus({order_id: order.order_id, order_status_id: order.selected_status_id}).subscribe({
      next: (res: any) => {
        this.orders = (res.data || []).map((o: any) => ({
          ...o,
          selected_status_id: o.order_status_id
        }));
        this.loading = false;
        this.getOrders();
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Failed to update order status.'
        });
      }
    });
    Swal.fire({
      icon: 'success',
      title: 'Status Updated',
      text: `Order #${order.order_id} status changed.`
    });
  }
}
