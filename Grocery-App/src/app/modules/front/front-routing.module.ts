import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'user',loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path:'cart',loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path:'catalogue',loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule)},
  {path:'**',component:ErrorPageComponent}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
