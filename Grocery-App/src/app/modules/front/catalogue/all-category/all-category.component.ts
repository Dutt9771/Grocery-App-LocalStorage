import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css'],
})
export class AllCategoryComponent {
  constructor(
    private router: Router,
    private productservice: ProductsService
  ) {}
  Product_Arr: any;
  ngOnInit() {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        window.scrollTo(0, 0);
      }
    });
    this.GetAllCategory();

    this.Product_Arr = this.productservice.getProducts();
    console.log(this.Product_Arr);
  }
  food: any;
  loading = true;
  GetAllCategory() {
    this.productservice.getAllCategory().subscribe({
      next: (Category_Res: any) => {
        if (Category_Res) {
          if (Category_Res.data) {
            console.log('Category_Res', Category_Res.data);
            this.grocery_items = Category_Res.data;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        }
      },
      error: (Category_error) => {
        console.log('Category_Error', Category_error);
      },
    });
  }
  grocery_items = [];
}
