import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShopComponent} from './shop/shop.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { OrderDetailsComponent } from './account/order-details/order-details.component';
import { AddProductsComponent } from './addproducts/addproducts.component';

const routes: Routes = [
  {path: 'shop', component: ShopComponent},
  {path: 'shop/checkout', component: CheckoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path : 'account', component: AccountComponent},
  {path: 'order', component: OrderDetailsComponent},
  { path: 'addbeer', component: AddProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
