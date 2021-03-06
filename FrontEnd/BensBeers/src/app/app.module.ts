import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DataService} from './shared/data.service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ShopComponent} from './shop/shop.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductListComponent} from './shop/products/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {CartComponent} from './shop/cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { OrderDetailsComponent } from './account/order-details/order-details.component';
import { AddProductsComponent } from './addproducts/addproducts.component';
import { BrewerieslistComponent } from './brewerieslist/brewerieslist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegistrationComponent,
    AccountComponent,
    OrderDetailsComponent,
    AddProductsComponent,
    BrewerieslistComponent,
    NavbarComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
