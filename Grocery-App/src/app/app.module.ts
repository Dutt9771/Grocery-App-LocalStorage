import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './modules/admin/admin.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthUserGuard } from './shared/guard/auth-user.guard';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { FrontModule } from './modules/front/front.module';
import { HomeComponent } from './shared/components/home/home.component';
import { CatalogueModule } from "./modules/front/catalogue/catalogue.module";
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { TokenInterceptor } from './shared/Interceptor/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'
import { CookieService } from 'ngx-cookie-service';
import { FocusformDirective } from './shared/directives/focusform.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmBoxConfigModule, DialogConfigModule, NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorPageComponent,
        HeaderComponent,
        FooterComponent,
        ContactUsComponent,
        FocusformDirective
    ],
    providers: [{
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('625408325836-r5q6i5chqvi42d4gone2ef0a5hetmk4k.apps.googleusercontent.com')
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('610808490382171'),
                    },
                ],
                onError: (err: any) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }, AuthUserGuard,
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
        {
            provide:HTTP_INTERCEPTORS,
            useClass:TokenInterceptor,
            multi:true,
        },
        [CookieService]
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxSpinnerModule.forRoot({type:"ball-scale-multiple"}),
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            progressBar:true,
            progressAnimation:'decreasing',
            tapToDismiss:true,
          }),
        FrontModule, 
        AdminModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        NgbModule,
        HttpClientModule,
        IvyCarouselModule,
        HttpClientModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        CatalogueModule,
        NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
        ConfirmBoxConfigModule.forRoot(),
        ToastNotificationConfigModule.forRoot()
        
    ]
})
export class AppModule { }
