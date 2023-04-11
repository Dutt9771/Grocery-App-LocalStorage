import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      progressBar:true,
      progressAnimation:'decreasing',
      tapToDismiss:true,
      
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({type:"ball-scale-multiple"})
  ]
})
export class CartModule { }
