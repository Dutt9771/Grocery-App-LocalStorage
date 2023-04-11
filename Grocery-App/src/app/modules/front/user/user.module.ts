import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ManageaddressComponent } from './manageaddress/manageaddress.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfilenavComponent } from './profilenav/profilenav.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AddaddressComponent } from './addaddress/addaddress.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DialogConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';




@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    ManageaddressComponent,
    OrdersComponent,
    ProfilenavComponent,
    ChangepasswordComponent,
    AddaddressComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({type:"ball-scale-multiple"}),
    DialogConfigModule.forRoot(),
    
  
    
  ],
  providers:[{
    provide: 'SocialAuthServiceConfig',
    useValue: {
        autoLogin: false,
        providers: [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('625408325836-r5q6i5chqvi42d4gone2ef0a5hetmk4k.apps.googleusercontent.com')
            },
        ],
        onError: (err: any) => {
            console.error(err);
        }
    } as SocialAuthServiceConfig,
},]
})
export class UserModule { }
