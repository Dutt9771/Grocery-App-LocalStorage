import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/shared/Models/item';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private _ProductsService: ProductsService,
    private renderer: Renderer2,
    private router: Router,
    private _cartservice: CartService,
    private spinner: NgxSpinnerService
  ) {}
  // loading=true;
  topsells: any;
  toprated: Item[];
  trendingItems: Item[];
  recentlyAdded: any;
  Customer_Id: number;
  User_Details: any;
  loading=true
  ngOnInit() {
    window.scrollTo(0, 0);
    this._cartservice.Guest_cart_Generate()
    this._cartservice.getItemCount()
      this._cartservice.Subtotal()
    // setTimeout(() => {
    //   this.loading=false
    // }, 1500);
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

    this.topsells = this._ProductsService.Top_Sells();
    this.toprated = this._ProductsService.Top_Rated();
    this.recentlyAdded = this._ProductsService.Recently_Added();
    this.trendingItems = this._ProductsService.Trending_Items();

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    if(this.User_Details){

      this.Customer_Id = this.User_Details.id;
    console.log('Customer_Id', this.Customer_Id);
    }

    // this.Showcart()
  }
  ShowcartArr: any = [];
  Showcart() {
  
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        let FindCustomer = this.ShowcartArr.find(
          (item) => item.id === this.Customer_Id
        );
        console.log('FindCustomer', FindCustomer);
        if (!FindCustomer) {
          // console.log("NOt User")
          
              this._cartservice.getItemCount();
              this._cartservice.Subtotal();
          
        }
      }
    });
    // return this.ShowcartArr
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }

  selectedProductRating: any = {}; // object to hold selected rating for each product

  changeProductRating(event: any, productId: number) {
    const selectedRating = event.target.title;
    this.selectedProductRating[productId] = selectedRating;
  }

  rating: number = 0;

  rate(rating: number) {
    this.rating = rating;
    console.log('rating', this.rating);
  }

  getStar(rating: number): string {
    let html = '';
    for (let i = 0; i < rating; i++) {
      html += '&#9733;'; // add full star
    }
    for (let i = rating; i < 5; i++) {
      html += '&#9734;'; // add empty star
    }
    return html;
  }
  setRating(index: number, value: number): void {
    this.topsells[index].rating = value;
  }
}
