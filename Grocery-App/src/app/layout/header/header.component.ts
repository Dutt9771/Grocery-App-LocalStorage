import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { RegisterService } from '../../shared/services/register/register.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { SearchService } from 'src/app/shared/services/search/search.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  category='all'
    filterValue:any
    Registered_User:boolean=false
    Login_Logout_msg:string="Login"
    cartItemCount :any
    // subTotal:any = 0;
    User_name="Login/Signup"
    
    constructor(private searchService: SearchService,private _productservice:ProductsService,private cookieService: CookieService,private _snackBar: MatSnackBar,private router:Router,private _RegisterService:RegisterService,private _cartService:CartService,private _productsservice:ProductsService,private toastr:ToastrService) {
      
      this._RegisterService.Login_Logout_msg.subscribe(res=>{
        if(res){

          this.Login_Logout_msg == res;
        }
        
      })
    }
    RegisterData:any
    User:any
    LoginData:any
    cartMessage:any
    CountArr:any=[]
    cartItemslength:any
    subtotal:any=0
    Cartlength:any
    filteredItems:any=[]
    myControl = new FormControl('');
      ngOnInit(){ 
        window.scrollTo(0,0) 
        this.GetAllCategory()
        // console.log("this._cartService.Subtotal()",this._cartService.Subtotal())
        // this._cartService.Subtotal()
        this.cartItemCount=this._cartService.getItemCount()
        this._cartService.cartLength$.subscribe((length) => {
    

            this.cartItemCount = length;
            this._cartService.currentSubtotal.subscribe((res)=>{
              if(res){

                this.subtotal=res
                // console.log("res",res)
              }
            })
          
      });
      // console.log("this._cartService.getItemCount()",this._cartService.getItemCount())
      this.filteredItems=this._productsservice.getProducts()
      this.router.events.subscribe((res:any)=>{
        if(res.url){
          this.Check_User()
          this._cartService.getItemCount()
      this._cartService.Subtotal()
        }
      })


        

this._cartService.currentSubtotal.subscribe(subtotal => this.subtotal = subtotal);

      // console.log("Subtotal",this.subtotal)

      this.LoginData= JSON.parse(sessionStorage.getItem('Login_User'));
      this.RegisterData= JSON.parse(sessionStorage.getItem('Register_User'));
      this.User= JSON.parse(sessionStorage.getItem('User'));
      if(this.LoginData || this.User){
        this.Login_Logout_msg="Logout"
      }
     
      this._productservice.currentMessage.subscribe(message => this.message = message)
    }

    message:string;

    query: string = '';
  
    onSearchClick(): void {
      this.searchService.setSearchQuery(this.query);
      this.router.navigate(["/front/catalogue/products-list",'all'])
    }

  //   Category_Select:any
  //   Select_Category(Category){
  //     this.Category_Select=Category
  //     console.log("Category",Category)
  //         }

  //   onSubmit(search) {
  //     console.log("Seach",search)
  //   this._productservice.changeMessage(search)
  //   // this.router.navigate(['/front/catalogue/products-list',this.Category_Select])
  // }

    Check_User(){
      
    // console.log("Register_user",this.Register_User)
    // console.log("Login_user",this.Login_User)
    this.Login_User= JSON.parse(sessionStorage.getItem('Login_User'))
    // this.LoginData= JSON.parse(sessionStorage.getItem('Login_User'));
    // this.RegisterData= JSON.parse(sessionStorage.getItem('Register_User'));
    this.Register_User= sessionStorage.getItem('Register_User');
    this.Register_User= JSON.parse(sessionStorage.getItem('Register_User'));
    // if(this.Register_User){
    //   this.Registered_User=false
    // }else{
    //   this.Registered_User=true
    // }
    // this.User= JSON.parse(sessionStorage.getItem('User'));
    if(this.Login_User){
      this.Registered_User=false
      this.Login_Logout_msg="Logout"
      this.User_name=this.Login_User.username
    }else{
      this.Registered_User=true
      this.User_name="Login/Signup"
      this.Login_Logout_msg="Login"
    }
    }
    cart:any=[]
    Login_User:any;
    Register_User:any


    title = 'Grocery-App';
    login_logout:boolean |undefined;
      userData:any = sessionStorage.getItem('User');
      email:any = this.userData
    logout(){
      if(this.Login_User){
      sessionStorage.removeItem('User');
      sessionStorage.removeItem('Login_User');
      sessionStorage.removeItem('Register_User');
      sessionStorage.removeItem('User_Details')
      this.cookieService.delete('User_Login_Token');
sessionStorage.removeItem('Guest_Cart')
this.router.navigate(['front/user/login'])
// console.log(this.email)
this.Login_Logout_msg="Login"
      this.User_name="Login/Signup"
      this._cartService.getItemCount()
      this._cartService.Subtotal()
      this.toastr.success('Logout Successfully');
      }
    }
  
  categories=[]
    grocery_items=[]
  GetAllCategory(){
    this._productservice.getAllCategory().subscribe({next:(Category_Res:any) => {
      if(Category_Res){

        // console.log("Category_Res",Category_Res.data)
        this.grocery_items=Category_Res.data
        for(let i=0;i<this.grocery_items.length;i++){
        this.categories.push(this.grocery_items[i].title)
        // console.log("Categories",this.categories)
      }
    }
    },error:(Category_error)=>{
        console.log("Category_Error",Category_error)
    }});
  }
    Add_cart_count(){
    
      this.router.navigate(['/front/cart'])
    }
    books = [
      { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling' },
      { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { title: 'The Catcher in the Rye', author: 'J.D. Salinger' }
    ];

   
    // onSubmit(searchTerm: string) {
    //   const filteredBooks = this.books.filter(book =>
    //     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     book.author.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    //   console.log(filteredBooks);
    // }
    
  }
  