import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private _cartservice: CartService,
    private productservice: ProductsService,
    private toastr: ToastrService,
    private route: Router
  ) {}
  filteredItems: any = [];
  Customer_Id: number;
  User_Details: any;
  categories_Path: any;
  ngOnInit() {
    this.route.events.subscribe((res: any) => {
      if (res.url) {
        window.scrollTo(0, 0);
      }
    });
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    if (this.User_Details) {
      this.Customer_Id = this.User_Details.id;
      // console.log('Customer_Id', this.Customer_Id);
    }
    this.GetProducts();
    // this.filteredItems=this.productservice.getProducts()
  }
  productArray: any[] = [];
  ProductAddobj: any;
  clickedItem: any = [];
  ShowcartArr: any = [];
  existing_Product: any;
  Find_Customer_Cart: any;
  Find_Customer_Cart_Arr: any = [];
  Showcart() {
    this._cartservice.ShowCart().subscribe((res) => {
      if (res) {
        this.ShowcartArr = res;
        this.Find_Customer_Cart = this.ShowcartArr.find(
          (item) => item.id === this.Customer_Id
        );
        // console.log("Find Customer",this.Find_Customer_Cart)
        this.Find_Customer_Cart_Arr = this.Find_Customer_Cart.items;
        // console.log("Find_Customer_Cart_Arr",this.Find_Customer_Cart_Arr)
      }
    });
    // console.log("ShowcartArr",this.ShowcartArr)
    return this.ShowcartArr;
  }
  GetProducts() {
    this.productservice.getALLProducts().subscribe({
      next: (get_all_products_res) => {
        if (get_all_products_res) {
          if (get_all_products_res.data) {
            console.log('get_all_products_res', get_all_products_res.data);
            this.filteredItems = get_all_products_res.data;
            // console.log("allProducts",this.filteredItems)
          }
        }
      },
      error: (get_all_products_error) => {
        console.log('get_all_products_error', get_all_products_error);
      },
    });
  }
  quantity = 1;
  product_quantity = {
    quantity: this.quantity,
  };
  Add_cart(i, product) {
    // console.log("ShowCartArr",this.ShowcartArr)
    // console.log("Product",product)
  
    // console.log("Existing Product",this.existing_Product)

    // console.log("Existing Product",this.existing_Product)

      // console.log("Filtered Item Arr",this.filteredItems[i])
      this.ProductAddobj = this.filteredItems[i];
      this.ProductAddobj = Object.assign(
        this.filteredItems[i],
        this.product_quantity
      );

      // for(let i=0;i<this.filteredItems.length;i++){
      //   this.ProductAddobj=this.filteredItems[i]
      //   console.log("OBJ",this.ProductAddobj)
      // }
      console.log('Cart Add Product', this.filteredItems[i]);

      this._cartservice.cartmsg = this.filteredItems[i].name;

      // this.rout.navigate(['/front/cart'])

      this._cartservice.cart.push(this.ProductAddobj);
      // emit updated cart data to subscribers
      this._cartservice.cartSubject.next(this._cartservice.cart);
      this._cartservice.ADD_Cart_User_Wise(this.User_Details.username,this.ProductAddobj,product.id)

      this.Showcart();
            this._cartservice.getItemCount();
            this._cartservice.Subtotal();
  }
}
