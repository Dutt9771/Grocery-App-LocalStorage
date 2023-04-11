import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { AllCategoryComponent } from './all-category/all-category.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductsComponent,
    AllCategoryComponent,
    
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    IvyCarouselModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({type:"ball-scale-multiple"})
    
  ],
  exports:[CategoryComponent,ProductsComponent]
})
export class CatalogueModule { }
