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
username:string
    ngOnInit(){ 
      window.scrollTo(0,0)
    this.User_Details=JSON.parse(sessionStorage.getItem('User_Details'))
    this.username=this.User_Details.username
    this.Customer_Id=this.User_Details.id
    console.log("Customer_Id",this.Customer_Id)
    let date = new Date()
    var getYear = date.toLocaleString("default", { year: "numeric" });
    var getMonth = date.toLocaleString("default", { month: "2-digit" });
var getDay = date.toLocaleString("default", { day: "2-digit" });
    this.dateFormat = getYear + "-" + getMonth + "-" + getDay;
console.log("dateFormat",JSON.stringify(this.dateFormat));
    this.filteredItems=this._productservice.getProducts()
  
    this._cartservice.ShowCart().subscribe((res)=>{
      if(res){

        this.cart=res
      setTimeout(() => {
        this.loading=false
      }, 1500);
    }

      this.Find_Customer_Cart=this.cart.find((item)=>item.id=== this.Customer_Id)
      console.log("Find_Customer_Cart",this.Find_Customer_Cart)
      this.Customer_Cart=this.Find_Customer_Cart.items
      console.log("Customer_Cart",this.Customer_Cart)

      // Category Wise
      
      this.groupedProducts = this.Customer_Cart.reduce((acc, product) => {
        
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
      // this._cartservice.cartSubject.subscribe(cart => {
      //   this.cartItemCount = cart.length;
      // });
      
      
      
     })
    
  
  
  
  
    // this._cartservice.getCartItems().subscribe(items => {
    //   this.cartItems = items;
    //   console.log(this.cartItems)
    // });
  }
  Find_Customer_Cart:any
  Customer_Cart:any=[]
  ngAfterViewInit(){
    this.CartEmptyShow_Data()
    this._cartservice.ShowCart().subscribe((res)=>{
      if(res){
        this.cart=res
        console.log("cart",this.cart)
        //       for(let i=0;i<this.cart.length;i++) {
          //   console.log("cart[i]",this.cart[i])
          // }
      // Category wise 
      this._cartservice.cartSubject.subscribe(res => {
        if(res){
          console.log("Before Cart",res)
          this.cart.splice(1,1);
          console.log("After Cart",this.cart)
        }
      });
    }
    })
    console.log("Subtotal From Cart",this.Subtotal())
   }
  //Badge
  
  // update the cart badge count
  
  
  Customer_Index:number
  quantity=1
  Obj:any
  Subtotal_Per_Prod:any
  quantitymin(index:any,productindex:any){
    // console.log("Quantity",this.groupedProducts[index].cart[productindex].quantity);
    // console.log(this.cart[productindex].amount)

    if(this.groupedProducts[index].cart[productindex].quantity>1){
      this.groupedProducts[index].cart[productindex].quantity-=1  
      
      this._cartservice.ShowCart().subscribe((res)=>{
        if(res){

          this.cart=res
          console.log("cart",this.cart)
          //       for(let i=0;i<this.cart.length;i++) {
            //   console.log("cart[i]",this.cart[i])
            // }
            this.Find_Customer_Cart=this.cart.find((item)=>item.id=== this.Customer_Id)
            console.log("Find_Customer_Cart",this.Find_Customer_Cart)
            
            this.Customer_Cart=this.Find_Customer_Cart.items
            console.log("Customer_Cart",this.Customer_Cart)
            
            this.Customer_Index=this.cart.indexOf(this.Find_Customer_Cart)
            console.log("this.cart.indexOf(this.Find_Customer_Cart)",this.cart.indexOf(this.Find_Customer_Cart))
            console.log("this.cart[this.Customer_Index].items[productindex]",this.cart[this.Customer_Index].items[productindex])
            
            this.cart[this.Customer_Index].items[productindex].quantity=this.groupedProducts[index].cart[productindex].quantity
            console.log("cart[productindex]",this.cart[this.Customer_Index].items[productindex])
            console.log("Customer_Cart",this.Customer_Cart)
            this._cartservice.EditCart(this.Customer_Id,this.cart[this.Customer_Index]).subscribe((cart)=>{
              if(cart){
              // console.log("cart in Service",cart)
              // console.log("Product Index",productindex)
              console.log("RES",res)
            }
            })
          }
          })
      
      // console.log("Subtotal From Cart",this.Subtotal())
  
  }
  }
  quantitymax(index,productindex){
    
    console.log("index==>",index,"  product index==>",productindex)
      // console.log(this.cart[productindex].amount)
      this.groupedProducts[index].cart[productindex].quantity+=1
      this._cartservice.ShowCart().subscribe((res)=>{
        if(res){

          this.cart=res
          console.log("cart",this.cart)
          //       for(let i=0;i<this.cart.length;i++) {
          //   console.log("cart[i]",this.cart[i])
          // }
          this.Find_Customer_Cart=this.cart.find((item)=>item.id=== this.Customer_Id)
          console.log("Find_Customer_Cart",this.Find_Customer_Cart)
          
          this.Customer_Cart=this.Find_Customer_Cart.items
          console.log("Customer_Cart",this.Customer_Cart)
          
          this.Customer_Index=this.cart.indexOf(this.Find_Customer_Cart)
          console.log("this.cart.indexOf(this.Find_Customer_Cart)",this.cart.indexOf(this.Find_Customer_Cart))
          console.log("this.cart[this.Customer_Index].items[productindex]",this.cart[this.Customer_Index].items[productindex])
          
          this.cart[this.Customer_Index].items[productindex].quantity=this.groupedProducts[index].cart[productindex].quantity
          console.log("cart[productindex]",this.cart[this.Customer_Index].items[productindex])
          console.log("cart[productindex]",this.cart[this.Customer_Index])
          console.log("cart[productindex]",this.cart[this.Customer_Index])
          
          this._cartservice.EditCart(this.Customer_Id,this.cart[this.Customer_Index]).subscribe((cart)=>{
            if(cart){

              // console.log("cart in Service",cart)
            // console.log("Product Index",productindex)
            console.log("RES",res)
          }
          })
        }
          })
        
        // this.cart[productindex].quantity=this.groupedProducts[index].cart[productindex].quantity
  
  
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
    
//       this.clickedItem= this.filteredItems[id]
// console.log("ID",id)
// console.log("this.filteredItems[id]",this.filteredItems[id])
//       this._cartservice.DelectProduct(id).subscribe((res)=>{
//         if (res) {
//           console.log("Deleted Group Product Arr",this.groupedProducts[index].cart.filter((product)=>product.id != id))
//           this._cartservice.ShowCart().subscribe((res)=>{
//             console.log("res",res) 
//             this.cartItemCount=res
//             // this.Cartlength=this.cartItemCount.length
//             this._cartservice.cartItemCount$.next(this.cartItemCount.length);
//           })
//         this.toastr.success('Remove to cart',product.name);

//       return this.groupedProducts[index].cart.splice(productindex,1)


// }
// console.log("this.Find_Customer_Cart.items.splice(productindex,1)",this.Find_Customer_Cart.items.splice(productindex,1))
// this.Find_Customer_Cart.items.splice(productindex,1)
this._cartservice.DeletCart_Using_Put(this.Customer_Id,this.Find_Customer_Cart,productindex).subscribe((cart)=>{
  if(cart){

    // console.log("cart in Service",cart)
    
    // console.log("Product Index",productindex)
    console.log("cart",cart)
    this._cartservice.getItemCount()
    this.Subtotal()
    // return this.groupedProducts
  }
  })
  return this.groupedProducts[index].cart.splice(productindex,1)
 
  // })
    
   
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



