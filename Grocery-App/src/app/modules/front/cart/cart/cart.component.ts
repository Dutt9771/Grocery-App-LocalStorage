import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems:any[]=[]
  loading:boolean=true
  constructor(private _productservice:ProductsService,private _cartservice:CartService,private route:Router,private toastr:ToastrService){
   
  }
  cart:any=[]
  // cartItems;
  price:any
  cartObj:any
  
  filteredItems:any=[]
  groupedProducts: any[] = [];
  cartlength:any
  cartEmptyShow=true
  data:any
  dateFormat:any
  Customer_Id:number
User_Details:any
Guest_Cart:any=[]
username:string
    ngOnInit(){ 
      window.scrollTo(0,0)
      this.Guest_Cart=JSON.parse(sessionStorage.getItem("Guest_Cart"))
      // console.log("Guesut Cart",this.Guest_Cart)
    this.User_Details=JSON.parse(sessionStorage.getItem('User_Details'))
    if(this.User_Details){

      this.username=this.User_Details.username
      this.Customer_Id=this.User_Details.id
      console.log("Customer_Id",this.Customer_Id)
    }
    this.Date()
// console.log("dateFormat",JSON.stringify(this.dateFormat));
    this.filteredItems=this._productservice.getProducts()
  
    setTimeout(() => {
      this.loading=false
    }, 1000);
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    if(Merge && this.User_Details){

      this.Find_Customer_Cart=Merge.find((user:any)=>user.username==this.User_Details.username)
      if(this.Find_Customer_Cart){
        this.Customer_Cart=this.Find_Customer_Cart.items
        console.log("Find_Customer_Cart",this.Find_Customer_Cart)
        console.log("Customer_Cart",this.Customer_Cart)
        
        this.Category_wise_Filter(this.Customer_Cart)
      }
    }
    else{
        console.log("this.Guest_Cart[0].items",this.Guest_Cart[0].items)
        this.Category_wise_Filter(this.Guest_Cart[0].items)
            }
  }
  Date(){
    let date = new Date()
    var getYear = date.toLocaleString("default", { year: "numeric" });
    var getMonth = date.toLocaleString("default", { month: "2-digit" });
var getDay = date.toLocaleString("default", { day: "2-digit" });
    this.dateFormat = getYear + "-" + getMonth + "-" + getDay;
  }
  Category_wise_Filter(Arr:any){
    this.groupedProducts = Arr.reduce((acc, product) => {
          
      const existingCategory = acc.find(group => group.category === product.category);
      if (existingCategory) {
        existingCategory.cart.push(product);
        // this.groupedProducts=this.cartlength
      } else {
        acc.push({ category: product.category, cart: [product] });
      }
      return acc;
  }, []);
  console.log(this.groupedProducts,"groupedProducts")
  console.log("cart",this.cart)
  }
  Find_Customer_Cart:any
  Customer_Cart:any=[]
  ngAfterViewInit(){
    this.CartEmptyShow_Data()
   
    // console.log("Subtotal From Cart",this.Subtotal())
   }
  //Badge
  
  // update the cart badge count
  
  
  Customer_Index:number
  quantity=1
  Obj:any
  Subtotal_Per_Prod:any
  quantitymin(index:any,productindex:any,product:any){

    if(this.groupedProducts[index].cart[productindex].quantity>1){
      this._cartservice.Quantity_Minus(this.User_Details.username,product)
      this.groupedProducts[index].cart[productindex].quantity-=1    
  }
  }
  quantitymax(index:any,productindex:any,product:any){
    this._cartservice.Quantity_Plus(this.User_Details.username,product)
      this.groupedProducts[index].cart[productindex].quantity+=1  
  }
  
  GST:any
  Total:any
  
  Subtotal():number {
    let subtotal:any = 0;
  // console.log("GroupProducts In Subtotal",this.groupedProducts)
    if(this.groupedProducts.length){
  
      for (let i = 0; i < this.groupedProducts.length; i++) {
        for(let j=0;j<this.groupedProducts[i].cart.length;j++){
          // console.log("Cart in Subtottal",this.cart[i])
          // subtotal += this.groupedProducts[i].cart[j].amount;
          subtotal += this.groupedProducts[i].cart[j].quantity * this.groupedProducts[i].cart[j].amount;
        }
    }
    this.GST=subtotal*0.18;
    this.Total=subtotal+this.GST
    // console.log("Subtotal Function =" ,subtotal)
    this._cartservice.updateSubtotal(subtotal);
    return subtotal;
  }else{
    subtotal=0
    return subtotal;
  }
    
  }
  
  // for Subtotal
  
  
  Subtotal_Per_Category(group) {
    let total = 0;
  let subtotal=0;
      // console.log("group",group.cart)
      for (let i=0;i<group.cart.length;i++) {
        let itemTotal = group.cart[i].amount * group.cart[i].quantity
        // console.log("group.cart[i].amount * group.cart[i].quantity",group.cart[i].amount * group.cart[i].quantity)
        subtotal += itemTotal;
      }
      // console.log(`Subtotal for ${cart.category}: ${subtotal} ${cart.cart[0].moneyOfferPrice}`);
      return total += subtotal;
      // console.log(`Total: ${total} ${cart[0].cart[0].money}`);
    }
  CartEmptyShow_Data(){
    if(!this.cart.length){
      this.cartEmptyShow=false
      console.log("cartEmptyShow",this.cartEmptyShow)
    }else{
              this.cartEmptyShow=true
              console.log("cartEmptyShow",this.cartEmptyShow)
            }
  }
  cartItemCount:any
  clickedItem:any=[]

  DelectProduct(id:any,index:any,productindex:any,product){
    
    this._cartservice.Delete_Cart_LocalStorage(this.User_Details.username,product)
    this.groupedProducts[index].cart.splice(productindex,1)
    this._cartservice.getItemCount()
      this._cartservice.Subtotal()
 
  }
  product:any
  ProductArr=[]
  get_cart_data(){
    for(let i=0;i<this.Find_Customer_Cart.items.length;i++){
      console.log("Cart Length",this.Find_Customer_Cart.items.length)
//  console.log("this.cart.length")
  this.product={
    "product_id":  this.Find_Customer_Cart.items[i].id,
    "product_name": this.Find_Customer_Cart.items[i].title,
    "qty": this.Find_Customer_Cart.items[i].quantity,
    "product_amount": this.Find_Customer_Cart.items[i].amount,
    "discount_type": 1,
    "discount_amount": 10
}
  this.ProductArr.push(this.product)
}

console.log("ProductArr",this.ProductArr)
return this.ProductArr
  }

  Checkout(){
    this.data={
      "order_date": "2023-04-06",
      "special_note": "its special",
      "estimate_delivery_date": "2023-04-20",
      "sub_total": this.Subtotal(),
      "tax_amount": this.GST.toFixed(2),
      "discount_amount": 10,
      "total_amount": this.Total,
      "paid_amount": this.Total,
      "payment_type": 2,
      "order_products":this.get_cart_data(),
  }
    console.log("cart",this.cart)
    this._cartservice.setCartTotal(this.Total);
    localStorage.setItem('Cart_Data', JSON.stringify(this.data)); // To set the value
  // this._cartservice.Cartdata=this.data
  console.log("this._cartservice.Cartdata",this._cartservice.Cartdata)
  
  
    this.route.navigate(['/front/cart/checkout'])
  }
  
  
  
    
  
  
}  





// interface Product {
//   name: string;
//   price: number;
//   category: string;
// }

// interface GroupedProduct {
//   category: string;
//   products: Product[];
// }



