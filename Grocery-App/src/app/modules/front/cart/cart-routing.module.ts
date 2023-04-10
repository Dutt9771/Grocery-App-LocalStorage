import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { AuthUserGuard } from 'src/app/shared/guard/auth-user.guard';
import { AuthCheckoutGuard } from 'src/app/shared/guard/auth-checkout.guard';

const routes: Routes = [
  {path:'',redirectTo:'cart',pathMatch:'full'},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthUserGuard]},
  {path:'success',component:SuccessComponent,canActivate:[AuthUserGuard]},
  {path:'**',component:ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthUserGuard,AuthCheckoutGuard]
})
export class CartRoutingModule { }
