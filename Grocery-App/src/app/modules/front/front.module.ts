import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FrontRoutingModule } from './front-routing.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CategoryComponent } from './catalogue/category/category.component';
import { ProductsComponent } from './catalogue/products/products.component';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';





@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FrontRoutingModule,
        FormsModule,
        UserModule,
        ReactiveFormsModule,
        CatalogueModule,
        CartModule,
        IvyCarouselModule
    ],
    exports:[CategoryComponent,ProductsComponent]
})
export class FrontModule { }
