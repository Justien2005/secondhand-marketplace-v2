import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TablesModule } from 'src/app/demo/pages/tables/tables.module';
import { UiBasicModule } from 'src/app/demo/ui-elements/ui-basic/ui-basic.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-product-add',
  imports: [TablesModule, UiBasicModule, SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './seller-product-add.component.html',
  styleUrl: './seller-product-add.component.scss'
})
export class SellerProductAddComponent implements OnInit {

  conditionList: any[] = [];
  categoryList: any[] = [];
  productForm: FormGroup;
  disableSaveButton: boolean = true;
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = new FormGroup({
      product_name: new FormControl(null, Validators.required),
      category_id: new FormControl(null, Validators.required),
      condition_id: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.min(0)),
      location: new FormControl(null),
      description: new FormControl(null),
      photo: new FormControl(null),
      stock: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    this.trackChanges();
    this.getConditionList();
    this.getCategoryList();
  }

  trackChanges() {
    this.productForm.valueChanges.subscribe(() => {
      this.disableSaveButton = !this.productForm.valid
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
    this.disableSaveButton = !this.productForm.valid || !this.selectedFile; // Example: disable if no file and form invalid
  }

  getConditionList() {
    this.productService.getProductConditions().subscribe({
      next: (res: any) => {
        this.conditionList = res.data;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
      }
    });
  }

  getCategoryList() {
    this.productService.getProductCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res.data;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: err.error.error,
        });
      }
    });
  }

  onSaveProduct() {
    Swal.fire({
      title: 'Are you sure want to save this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        const formData = new FormData();
        Object.keys(this.productForm.value).forEach(key => {
          if (key !== 'photo') {
            formData.append(key, this.productForm.value[key]);
          }
        });

        if (this.selectedFile) {
          formData.append('photo', this.selectedFile, this.selectedFile.name);
        }
        console.log(formData);

        this.productService.saveSellerProduct(formData).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Product Saved Successfully',
              text: res.message,
            });
            this.router.navigate(['/pages/seller-pages/seller-product-list']);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Internal Server Error',
              text: err.error.error,
            });
          }
        })
      }
    })
  }

}
