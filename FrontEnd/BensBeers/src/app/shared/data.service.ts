import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseBeer } from './products';
import { Order, OrderItem } from './order';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public order: Order = new Order();

  public products: BaseBeer[] = [];

  private token: string = '';
  private tokenExpiration: Date;

  public get loginRequired(): boolean {
    return this.token.length == 0 || this.tokenExpiration < new Date();
  }

  login(creds): Observable<boolean> {
    return this.http
    .post("/account/createtoken", creds)
      .pipe(map((data: any) => {
      this.token = data.token;
      this.tokenExpiration = data.tokenExpiration;
      return true
  }));
}

  loadProducts(): Observable<boolean> {
    return this.http.get('http://localhost:8888/api/products')
      .pipe(
        map((data: any[]) => {
          this.products = data;
          return true;
        }));
  }


  public addToOrder(newProduct: BaseBeer) {
    let item: OrderItem = this.order.items.find(o => o.id == newProduct.id);
    if (item) {
      item.quantity++;
    }
    else {
      item = new OrderItem();
      item.id = newProduct.id;
      item.beerBeerName = newProduct.beerName;
      item.beerAbv = newProduct.abv;
      item.beerBrewery = newProduct.brewery;
      item.beerSize = newProduct.size;
      item.unitPrice = newProduct.price;
      item.quantity = 1;

      this.order.items.push(item);
    }
  }
}

