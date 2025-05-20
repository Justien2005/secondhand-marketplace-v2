import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  standalone: false,
  
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit {

  // public props
  productList: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  categories: string[] = ['all', 'electronics', 'clothing', 'books'];

  // constructor
  constructor() {}

  // lifecycle hook
  ngOnInit(): void {
    this.productList = [
      { id: 1, name: 'Laptop', category: 'electronics' },
      { id: 2, name: 'T-shirt', category: 'clothing' },
      { id: 3, name: 'Book', category: 'books' },
      { id: 4, name: 'Smartphone', category: 'electronics' },
      { id: 5, name: 'Jeans', category: 'clothing' }
    ];
    this.filteredProducts = this.productList;
  }

  // public method
  filterProducts() {
    this.filteredProducts = this.productList.filter(product => {
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }

}
