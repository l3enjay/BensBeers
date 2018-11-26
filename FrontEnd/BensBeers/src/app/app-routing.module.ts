import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from "./shop/shop.component"
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
{ path: 'shop', component: ShopComponent },
{ path: 'shop/checkout', component: CheckoutComponent },
{ path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
