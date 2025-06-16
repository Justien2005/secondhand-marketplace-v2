import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-listing',
  imports: [TablesModule, SharedModule],  
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  categories: string[] = ['all', 'electronics', 'clothing', 'books'];
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getAllProduct().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loading = false;
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

  viewDetails(product: any) {
    this.router.navigate(['/pages/buyer-pages/product-detail', product.product_id]);
  }

  changeProductStatus(product: any, isApproved: boolean) {
    this.productService.changeProductApprovalStatus(product.product_id, isApproved).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Failed to change product status.'
        });
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }

}
