import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  mergeMap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CartItemsLength: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  baseurl = environment.baseurl;
  baseUrl = environment.baseUrl;
  resname = environment.resname;
  add_order = environment.orders_routes.add_order;
  get_order_by_id = environment.orders_routes.get_order_by_id;

  private cartItemsSubject = new BehaviorSubject([]);
  private cartCount = new BehaviorSubject(0);

  // AddCart(data:any){
  //   try {
  //     return this.http.post(this.baseurl+this.resname,data)
  //   } catch (error:any) {
  //     return throwError(()=>new Error(error))
  //   }
  // }
  // EditCart(customer_id,data:any){
  //   try {
  //     return this.http.put(this.baseurl+this.resname+'/'+customer_id,data)
  //   } catch (error:any) {
  //     return throwError(()=>new Error(error))
  //   }
  // }
  // DeletCart_Using_Put(customer_id,data:any,index){
  //   try {
  //     data.items.splice(index,1)
  //     return this.http.put(this.baseurl+this.resname+'/'+customer_id,data)
  //   } catch (error:any) {
  //     return throwError(()=>new Error(error))
  //   }
  // }
  // url:any
  // items:any

  // AddCartUserWise(customerId: number,data:any){
  //   try {
  //     return this.http.get(this.baseurl+this.resname+"/"+customerId).pipe(
  //       mergeMap((customer: any) => {
  //         const currentItemArray = customer.items;
  //         currentItemArray.push(data);

  //         return this.http.patch(this.baseurl+this.resname+"/"+customerId, {
  //           items: currentItemArray
  //         });
  //       })
  //     );

  //     // this.url= `${this.baseurl}${customerId}/items`;
  //     // return this.http.patch(`this.baseurl${customerId}`,{
  //     //   items: [...data]
  //     // })
  //   } catch (error:any) {
  //     return throwError(()=>new Error(error))
  //   }
  // }
  // ShowCart(){
  //   try {
  //   return this.http.get(this.baseurl+this.resname)
  // } catch (error:any) {
  //   return throwError(()=>new Error(error))
  // }
  // }

  DelectProduct(id: any) {
    try {
      return this.http.delete(this.baseurl + this.resname + '/' + id);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
  DelectUserCart(customerId: any) {
    try {
      return this.http.get(this.baseurl + this.resname + '/' + customerId).pipe(
        mergeMap((customer: any) => {
          const currentItemArray = [];

          return this.http.patch(
            this.baseurl + this.resname + '/' + customerId,
            {
              items: currentItemArray,
            }
          );
        })
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  public cartTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartmsg$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setCartTotal(total: number) {
    try {
      return this.cartTotal$.next(total);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
  setCartmsg(msg: string) {
    try {
      return this.cartmsg$.next(msg);
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  public cart = [];

  cartArr() {
    return this.cart;
  }
  public cartmsg = '';
  public cartSubject = new Subject<any>();
  public cartMsg = new Subject<any>();
  cartItemCount$ = new BehaviorSubject<any>(0);

  public subtotalSource = new BehaviorSubject<number>(0);
  currentSubtotal = this.subtotalSource.asObservable();

  updateSubtotal(subtotal: number) {
    this.subtotalSource.next(subtotal);
  }
  Subtotal() {
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    if (this.User_Details) {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      this.Find_Customer_Cart = Merge.find(
        (user: any) => user.username == this.User_Details.username
      );

      if (this.Find_Customer_Cart) {
        // console.log("Find_Customer_Cart",this.Find_Customer_Cart)
        this.Customer_Cart = this.Find_Customer_Cart.items;
        // console.log("Customer_Cart",this.Customer_Cart)
        // this.subtotalSource.next
        let cartsubtotal: number = 0;
        for (let i = 0; i < this.Customer_Cart.length; i++) {
          if (this.Customer_Cart[i].quantity && this.Customer_Cart[i].amount) {
            cartsubtotal +=
              this.Customer_Cart[i].quantity * this.Customer_Cart[i].amount;
            // console.log("this.cartsubtotal",this.cartc[i].quantity*this.cartc[i].amount)
            // console.log("this.cartsubtotal",this.cartc[i].amount)
            // console.log("this.cartsubtotal",this.cartc[i].quantity)
            // console.log("this.cartcartsubtotalsubtotal",this.cartc[i])
            // console.log("this.cartsubtotal",this.cartc)
            // console.log("this.cartsubtotal",cartsubtotal)
          }
        }
        this.subtotalSource.next(cartsubtotal);
      }
    } else {
      let Guest_Cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      if (Guest_Cart) {
        let cartsubtotal: number = 0;
        // console.log("Guest_Cart[0].items[0]",Guest_Cart[0].items[0])
        if (Guest_Cart[0].items[0]) {
          let cartsubtotal = Guest_Cart[0].items[0].amount;
          this.subtotalSource.next(cartsubtotal);
          
        }
       else {
        let cartsubtotal: number = 0;
        this.subtotalSource.next(cartsubtotal);
      }
      }
    }
  }

  cartc: any;
  Cartdata: any;
  cartcount = new BehaviorSubject<any>(0);
  public cartLengthSubject = new BehaviorSubject<number>(0);
  public cartLength$ = this.cartLengthSubject.asObservable();

  // When the cart updates, emit a new value for the cart length subject
  updateCart(cart: any[]): void {
    // Update the logic for updating the cart array here
    const cartLength = cart.length;
    this.cartLengthSubject.next(cartLength);
  }

  Find_Customer_Cart: any;
  Customer_Cart: any = [];
  Customer_Id: number;
  User_Details: any;
  getItemCount() {
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    if (this.User_Details) {
      if (this.User_Details) {
        let Merge = JSON.parse(localStorage.getItem('Cart'));
        this.Find_Customer_Cart = Merge.find(
          (user: any) => user.username == this.User_Details.username
        );
        // console.log("cartc",this.cartc.length)
        // this.cartcount.next(this.cartc.length);
        // console.log("cartcount",this.cartcount)
        // console.log("Find_Customer_Cart",this.Find_Customer_Cart)
        if (this.Find_Customer_Cart) {
          this.Customer_Cart = this.Find_Customer_Cart.items;
          // console.log("Customer_Cart",this.Customer_Cart)
          const cartLength = this.Customer_Cart.length;

          this.cartLengthSubject.next(cartLength);
        }
      }
    } else {
      let Guest_Cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      if (Guest_Cart) {
        const cartLength = Guest_Cart[0].items.length;
        this.cartLengthSubject.next(cartLength);
      } else {
        const cartLength = 0;
        this.cartLengthSubject.next(cartLength);
      }
    }
  }

  Add_Order(
    data: any,
    delivery_address_id: any,
    billing_address_id: any,
    payment_status: any,
    order_status: any
  ) {
    try {
      return this.http.post<any>(this.baseUrl + this.add_order, data, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          billing_address_id: billing_address_id,
          delivery_address_id: delivery_address_id,
          payment_status: payment_status,
          order_status: order_status,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
  Get_Order_Detail_By_Id(order_id: any) {
    try {
      return this.http.get<any>(this.baseUrl + this.get_order_by_id, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          order_id: order_id,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  // LocalStorage

  User_Add_Cart(username: any) {
    let cart_Arr: any = [];
    if (localStorage.getItem('Cart')) {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      cart_Arr = Merge.find((user: any) => user.username == username);
      console.log('Cart_Arr', cart_Arr);
      let cart = {
        username: username,
        items: [],
      };
      if (!cart_Arr) {
        console.log('username', username);
        console.log('cart', cart);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('Cart')) {
          localStorage.setItem('Cart', Arr);
        }

        let Merge = JSON.parse(localStorage.getItem('Cart'));
        Merge.push(cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));
        // localStorage.setItem("Cart",JSON.stringify(cart))
      }
    } else {
      let cart = {
        username: username,
        items: [],
      };
      if (!cart_Arr) {
        console.log('username', username);
        console.log('cart', cart);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('Cart')) {
          localStorage.setItem('Cart', Arr);
        }

        let Merge = JSON.parse(localStorage.getItem('Cart'));
        Merge.push(cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));
        // localStorage.setItem("Cart",JSON.stringify(cart))
      }
    }
  }
  ADD_Cart_User_Wise(username: any, data: any, id: any) {
    // let Product_Quantity={
    //   qunatity:quantity
    // }
    let Guest_cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    if (!Guest_cart) {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      let cart = Merge.find((user: any) => user.username == username);
      let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
      if (!duplicate) {
        cart.items.push(data);
        console.log('Cart in Service==>>', cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));
        this.toastr.success('Added to cart', data.title);
      } else {
        // duplicate.quantity=duplicate.quantity+1
        console.log('Merge', Merge);
        this.toastr.info('Already Added Please Go to Cart', data.title);
        localStorage.setItem('Cart', JSON.stringify(Merge));
      }
    } else {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      let cart = Merge.find((user: any) => user.username == username);
      let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
      if (!duplicate) {
        cart.items.push(data);
        if(Guest_cart[0].items.length){

          cart.items.push(Guest_cart[0].items[0]);
          if (Guest_cart) {
            let Merge = JSON.parse(localStorage.getItem('Guest_Cart'));
            if (Merge) {
              Merge[0].items = [];
              console.log("Merge",Merge)
              localStorage.setItem('Guest_Cart', JSON.stringify(Merge));
            }
          }
        }
        console.log('Cart in Service==>>', cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));
        this.toastr.success('Added to cart', data.title);
      } else {
        // duplicate.quantity=duplicate.quantity+1
        console.log('Merge', Merge);
        this.toastr.info('Already Added Please Go to Cart', data.title);
        localStorage.setItem('Cart', JSON.stringify(Merge));
      }
    }
  }

  ADD_Cart_User_Wise_Quantity(username: any, data: any, id: any) {
    // let Product_Quantity={
    //   qunatity:quantity
    // }

    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
    if (!duplicate) {
      cart.items.push(data);
      console.log('Cart in Service==>>', cart);
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      this.toastr.success('Added to cart', data.title);
    } else {
      duplicate.quantity = duplicate.quantity + 1;
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      this.toastr.info('Already Added Please Go to Cart', data.title);
    }
  }
  Quantity_Plus(username: any, data: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find(
      (Duplicate: any) => Duplicate.id == data.id
    );

    duplicate.quantity = duplicate.quantity + 1;
    console.log('Merge', Merge);
    // this.toastr.info('Already Added Please Go to Cart', data.title);
    localStorage.setItem('Cart', JSON.stringify(Merge));
  }
  Quantity_Minus(username: any, data: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find(
      (Duplicate: any) => Duplicate.id == data.id
    );
    if (duplicate.quantity > 0) {
      duplicate.quantity = duplicate.quantity - 1;
      console.log('Merge', Merge);
      // this.toastr.info('Already Added Please Go to Cart', data.title);
      localStorage.setItem('Cart', JSON.stringify(Merge));
    }
  }
  Delete_Cart_LocalStorage(username: any, data: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find(
      (Duplicate: any) => Duplicate.id == data.id
    );
    let Index = cart.items.indexOf(duplicate);
    console.log('cart indexOf', cart.items.indexOf(duplicate));
    console.log('cart.items.splice(Index,1)', cart.items.splice(Index, 1));
    cart.items.splice(Index, 1);
    localStorage.setItem('Cart', JSON.stringify(Merge));
  }
  Delete_User_Cart_LocalStorage(username: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    cart.items = [];
    console.log('cart.items', cart.items);
    console.log('Merge', Merge);
    localStorage.setItem('Cart', JSON.stringify(Merge));
    // this.getItemCount()
    //   this.Subtotal()
  }
  Guest_cart_Generate() {
    if (!sessionStorage.getItem('Guest_Cart')) {
      let cart = {
        items: [],
      };

      console.log('cart', cart);
      let Arr = JSON.stringify([]);
      if (!sessionStorage.getItem('Guest_Cart')) {
        sessionStorage.setItem('Guest_Cart', Arr);
      }
      let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      Merge.push(cart);
      console.log('Merge', Merge);
      sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
    }
  }
  Guest_User(data: any) {
    if (sessionStorage.getItem('Guest_Cart')) {
      let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      if (Merge[0].items.length == 0) {
        let duplicate = Merge[0].items.find(
          (Duplicate: any) => Duplicate.id == data.id
        );
        if (!duplicate) {
          Merge[0].items.push(data);
          console.log('Cart in Service==>>', Merge);
          sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
          this.toastr.success('Added to cart', data.title);
        } else {
          // duplicate.quantity=duplicate.quantity+1
          console.log('Merge', Merge);
          this.toastr.info('Already Added Please Go to Cart', data.title);
          sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
        }
      } else {
        this.toastr.error('Please Login For Add More Items in Cart');
      }
    }
  }
  Delete_Guest_cart() {
    let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    if (Merge) {
      Merge[0].items = [];
      sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
    }
  }
}
