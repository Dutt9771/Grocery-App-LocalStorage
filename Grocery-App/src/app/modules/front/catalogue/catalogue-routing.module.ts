import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { AllCategoryComponent } from './all-category/all-category.component';

const routes: Routes = [
  {path:'product-details/:id/:slug',component:ProductDetailsComponent},
  {path:'product-details/:slug',component:ProductDetailsComponent},
  {path:'products-list/:id',component:ProductListComponent},
  {path:'products',component:ProductsComponent},
  {path:'category',component:CategoryComponent},
  {path:'all-category',component:AllCategoryComponent},
  {path:'**',component:ErrorPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
