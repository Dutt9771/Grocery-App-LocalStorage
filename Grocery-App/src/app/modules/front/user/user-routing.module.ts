import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from 'src/app/shared/guard/auth-user.guard';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { ContactUsComponent } from '../../../shared/components/contact-us/contact-us.component';
import { HomeComponent } from '../../../shared/components/home/home.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import { LoginComponent } from './login/login.component';
import { ManageaddressComponent } from './manageaddress/manageaddress.component';
import { OrdersComponent } from './orders/orders.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddaddressComponent } from './addaddress/addaddress.component';
import { ProfilenavComponent } from './profilenav/profilenav.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'user-profile',
    component:ProfilenavComponent,
    canActivate:[AuthUserGuard],
    children:[
      {path:'',redirectTo:'edit-profile',pathMatch:'full'},
      {path:'edit-profile',component: UserProfileComponent},
      { path: 'orders', component: OrdersComponent ,canActivate:[AuthUserGuard]},
      { path: 'changepassword', component: ChangepasswordComponent ,canActivate:[AuthUserGuard]},
      { path: 'manageaddress', component: ManageaddressComponent ,canActivate:[AuthUserGuard]},
      { path: 'addaddress', component: AddaddressComponent},
      { path: 'editaddress/:id', component: AddaddressComponent},

    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', component: ErrorPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthUserGuard]
})
export class UserRoutingModule {}
