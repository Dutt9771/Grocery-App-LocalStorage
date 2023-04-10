import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { HomeComponent } from './shared/components/home/home.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'front',
  loadChildren: () => import('./modules/front/front.module').then(m => m.FrontModule)},
  {path:'admin',
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path:'**',component:ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
