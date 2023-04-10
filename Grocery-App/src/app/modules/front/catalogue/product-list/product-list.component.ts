import {
  AfterContentInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { ProductListService } from 'src/app/shared/services/product-list/product-list.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { SearchService } from 'src/app/shared/services/search/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  defaultCategory = 'all';
  selectedCategory: string;
  constructor(
    private _encryptionservice: EncryptionService,
    private route: ActivatedRoute,
    private productservice: ProductsService,
    private _cartservice: CartService,
    private router: Router,
    private toastr: ToastrService,
    private searchService:SearchService
  ) {
    this.selectedCategory = this.defaultCategory;
  }
  category: any;
  product_quantity:any
  filterValue: any;
  productArray: any = [];

  filteredItems: any = [];
  Product_Arr: any = [];
  category_path:any;
  categories: any;
  GetProductByCategory(encryption:any) {
    this.productservice.getProductByCategoryId(encryption).subscribe({
      next: (Product_Res: any) => {
        if (Product_Res) {
          if (Product_Res.data) {
            console.log('Product_Res', Product_Res.data);
            this.filteredItems = Product_Res.data;
          }
        }
      },
      error: (Product_error) => {
        console.log('Product_error', Product_error);
      },
    });
  }
  loading = true;
  allProducts: any = [];
  GetProducts() {
    this.productservice.getALLProducts().subscribe({
      next: (get_all_products_res) => {
        if (get_all_products_res) {
          if (get_all_products_res.data) {
            console.log('get_all_products_res', get_all_products_res);
            this.allProducts = get_all_products_res.data;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            console.log('allProducts', this.allProducts);
          }
        }
      },
      error: (get_all_products_error) => {
        console.log('get_all_products_error', get_all_products_error);
      },
    });
  }
  encryption_data: string;
  encryption(id) {
    this._encryptionservice.Encryption(id).subscribe({
      next: (encryption_res) => {
        if (encryption_res) {
          if (encryption_res.data) {
            console.log('encryption_res', encryption_res);
            this.encryption_data = encryption_res.data;
            console.log('encryption_data', this.encryption_data);
            this.GetProductByCategory(this.encryption_data);
          }
        }
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
      },
    });
  }
  grocery_items = [];
  Category_Id: any;
  categories_Arr = [];

  GetAllCategory() {
    // if (this.category_path!="all") {
    this.productservice.getAllCategory().subscribe({
      next: (Category_Res: any) => {
        if (Category_Res) {
          if (Category_Res.data) {
            console.log('Category_Res', Category_Res.data);
            this.grocery_items = Category_Res.data;
            if (this.category_path != 'all') {
              this.product_Obj = this.grocery_items.find(
                (item) => item.slug === this.category_path
              );
              this.Category_Id = this.product_Obj.id;
            }
            // console.log("product_Obj",this.product_Obj)
            // console.log("Category_Id",this.Category_Id)
            for (let i = 0; i < this.grocery_items.length; i++) {
              this.categories_Arr.push(this.grocery_items[i].title);
              // console.log("Categories",this.categories)
            }
            this.categories_Arr.unshift('all');
            if (!(this.category_path == 'all')) {
              this.encryption(this.Category_Id.toString());
            }
          }
        }
      },
      error: (Category_error) => {
        console.log('Category_Error', Category_error);
      },
    });
    // }
  }
  Customer_Id: number;
  User_Details: any;
  categories_Path: any;
  product_Obj: any;
  message:string;
  Search_Arr:any
  Search:any
  Search_In_All_Product(){
    this.searchService.getSearchQuery().subscribe((query) => {
      console.log("Query",query)
      this.Search=query
      if(query){

        if (this.category_path) {
          if (this.category_path == 'all') {
            console.log("ALl products",this.allProducts)
            this.Search_Arr=this.allProducts.filter((product) =>
            // product.id.includes(query)
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.short_description.toLowerCase().includes(query.toLowerCase()) ||
            product.slug.toLowerCase().includes(query.toLowerCase())
            
            );
            console.log("ALl products",this.Search_Arr)
            
          }
        }
      }else{
        this.GetProducts();
      }
      })
  }
  quantity = 1;
  ngOnInit() {  
    this.Search_In_All_Product()
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        window.scrollTo(0, 0);
      }
    });
    this.route.paramMap.subscribe((params) => {
      if (params) {
        this.category_path = params.get('id');
        console.log('Category path', this.category_path);
        
          this.product_quantity = {
            category:this.category_path,
            quantity: this.quantity,
          };
        this.GetAllCategory();
      }
    });
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    if(this.User_Details){

      this.Customer_Id = this.User_Details.id;
    console.log('Customer_Id', this.Customer_Id);
    this.GetProducts();
  }

    // this.filteredItems=this.productservice.getProducts()
    // this.productArray=this.productservice.getProducts()

    this.categories = this.allProducts.reduce((acc, curr) => {
      if (!acc.includes(curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    }, []);
    this.categories = Array.from(
      new Set(this.productArray.map((product) => product.category))
    );
    this.categories.unshift('all');

    if (this.category_path) {
      if (this.category_path == 'all') {
        this.filteredItems = this.allProducts;
        console.log('filteredItems', this.filteredItems);
        this.category = 'All Products';
      } else {
        this.filteredItems = this.filteredItems.filter(
          (filteredItems) => filteredItems[0].category_id === this.Category_Id
        );
        this.category = this.category_path;
      }

      console.log('Categories', this.categories);
      console.log('productArray', this.productArray);
    } else {
      this.Filter_Category(this.selectedCategory);
    }
  }
  Selected_Category: any;
  Filter_Category(category: any) {
    this.Selected_Category = category;
    if (this.category_path == 'all') {
      this.selectedCategory = 'all';
      if (category === 'all') {
        this.filteredItems = [];
        this.GetProducts();
        // return this.allProducts;
      } else {
        this.allProducts = [];
        let Filter_Category_Obj = this.grocery_items.find(
          (item) => item.slug === category
        );
        this.Category_Id = Filter_Category_Obj.id;
        // this.encryption((this.Category_Id).toString())
        console.log('filteredItems', this.filteredItems);
        console.log('allProducts', this.allProducts);
        console.log('Customer_Id', this.Customer_Id);
        this.encryption(this.Category_Id.toString());
        // return this.filteredItems
      }
    } else {
      // this.selectedCategory = 'all';
      if (category === 'all') {
        this.filteredItems = [];
        for (let i = 0; i < this.allProducts.length; i++) {
          let Obj = {
            category: 'all',
            product: this.allProducts[i],
          };
          this.filteredItems.push(Obj);
          // console.log("Filter Items",this.filteredItems)
        }
        return this.filteredItems;
      } else {
        this.product_Obj = this.grocery_items.find(
          (item) => item.slug === category
        );
        this.Category_Id = this.product_Obj.id;
        this.encryption(this.Category_Id.toString());
        console.log(this.filteredItems);
        return this.filteredItems;
      }
    }
  }

  // checkCategory() {
  //   this.route.paramMap.subscribe((params) => {
  //     const category = params.get('category');
  //     console.log(category);
  //     if (category == 'all') {
  //       // Filter products array based on category
  //       this.productArray;
  //       console.log(this.productArray);
  //       this.category = 'Grocery Products';
  //     } else {
  //       this.productArray = this.productArray.filter(
  //         (productArray) => productArray.category === category
  //       );
  //       this.category = category;
  //     }

  //     console.log(this.categories);
  //   });
  // }

  // bysellername(){
  //   this.productArray = this.sortBySellerName(this.productArray);
  //   console.log(this.productArray)
  // }
  // byname(){
  //   this.productArray = this.sortByName(this.productArray);
  //   console.log(this.productArray)
  // }

  // sortBySellerName(products:any) {
  //   return products.sort((a:any, b:any) => {
  //     if (a.sellerName < b.sellerName) {
  //       return -1;
  //     } else if (a.sellerName > b.sellerName) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }
  // sortByName(products:any) {
  //   return products.sort((a:any, b:any) => {
  //     if (a.name < b.name) {
  //       return -1;
  //     } else if (a.name > b.name) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }

  ProductAddobj: any;
  clickedItem: any = [];
  ShowcartArr: any = [];
  existing_Product: any;
  Find_Customer_Cart: any;
  Find_Customer_Cart_Arr: any = [];
  Showcart() {
  
  }

  
  Add_cart(i, product) {
    console.log('ShowCartArr', this.ShowcartArr);
    console.log('Product', product);
    if(this.User_Details){

      this.existing_Product = this.Find_Customer_Cart_Arr.find(
        (item) => item.title.toLowerCase() === product.title.toLowerCase()
    );
    console.log('Existing Product', this.existing_Product);
    console.log('Existing Product', this.existing_Product);
   
      if (this.category_path == 'all') {
        console.log('All Products', this.allProducts);
        console.log('id', i);

        console.log('Filtered Item Arr', this.allProducts[i]);
        this.ProductAddobj = this.allProducts[i];
        this.ProductAddobj = Object.assign(
          this.ProductAddobj,
          this.product_quantity
        );
        this._cartservice.ADD_Cart_User_Wise(this.User_Details.username,this.ProductAddobj,product.id)
        this._cartservice.getItemCount()
      this._cartservice.Subtotal()
      } else {
        console.log('id', i);
        console.log('Filtered Item Arr', this.filteredItems[i]);
        this.ProductAddobj = this.filteredItems[i].product;
        this.ProductAddobj = Object.assign(
          this.ProductAddobj,
          this.product_quantity
        );
        this._cartservice.ADD_Cart_User_Wise(this.User_Details.username,this.ProductAddobj,product.id)
        this._cartservice.getItemCount()
        this._cartservice.Subtotal()
      }

    this.Showcart();
      }else{
        this.ProductAddobj = this.allProducts[i];
        this.ProductAddobj = Object.assign(
          this.ProductAddobj,
          this.product_quantity
        );
        this._cartservice.Guest_User(this.ProductAddobj)
      }
  }
}
