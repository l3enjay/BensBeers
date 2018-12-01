import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { BaseBeer, Brewery } from './products';
import { Order, OrderItem } from './order';
import { Registration } from './registration';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) { }

  public newordernumber = '';
  public order: Order = new Order();
  public orderDisplay: Order = new Order();
  public newUser: Registration = new Registration();
  public userOrders: Order[] = [];
  public orderSelected = '';
  public selectedOrder: Order = new Order();
  public newOrder: Order = new Order();

  public products: BaseBeer[] = [];
  public breweries: Brewery[] = [];

  private token = '';
  private tokenExpiration: Date;

  public removefromorder(item: OrderItem) {
    const index: number = this.order.items.indexOf(item);
    if (index !== -1) {
      this.order.items.splice(index, 1);
      this.orderDisplay.items.splice(index, 1);
    }
  }

  public increasenumberinorder(item: OrderItem) {
    const index: number = this.order.items.indexOf(item);
    if (index !== -1) {
      this.order.items[index].quantity = this.order.items[index].quantity + 1;
      this.orderDisplay.items[index].quantity = this.orderDisplay.items[index].quantity + 1;
    }
  }

  public decreasenumberinorder(item: OrderItem) {
    const index: number = this.order.items.indexOf(item);
    if (index !== -1) {
      this.order.items[index].quantity = this.order.items[index].quantity - 1;
      this.orderDisplay.items[index].quantity = this.orderDisplay.items[index].quantity - 1;
    }
  }

  public calculatesubtotalinarray(ordercalculate: Order): number {
    return _.sum(_.map(ordercalculate.items, i => i.unitPrice * i.quantity));
  }

  public get loginRequired(): boolean {
    return this.token.length === 0 || this.tokenExpiration < new Date();
  }

  login(creds): Observable<boolean> {
    return this.http.post('http://localhost:8888/api/account/CreateToken', creds).pipe(
      map((data: any) => {
        this.token = data.token;
        this.tokenExpiration = data.tokenExpiration;
        return true;
      })
    );
  }

  loadBreweries(): Observable<boolean> {
    return this.http.get('http://localhost:8888/api/breweries').pipe(
      map((data: any[]) => {
        this.breweries = data;
        return true;
      })
    );
  }

  loadProducts(): Observable<boolean> {
    return this.http.get('http://localhost:8888/api/products').pipe(
      map((data: any[]) => {
        this.products = data;
        return true;
      })
    );
  }

  public addToOrder(newProduct: BaseBeer) {
    console.log(newProduct.id);
    let item: OrderItem = this.order.items.find(o => o.beerId === newProduct.id);
    if (item) {
      item.quantity++;
    } else {
      item = new OrderItem();
      item.beerId = newProduct.id;
      item.beerBeerName = newProduct.beerName;
      item.beerAbv = newProduct.abv;
      item.beerSize = newProduct.size;
      item.beerStyle = newProduct.style;
      item.unitPrice = newProduct.price;
      item.quantity = 1;

      this.order.items.push(item);
    }

    let itemDisplay: OrderItem = this.orderDisplay.items.find(o => o.beerId === newProduct.id);
    if (itemDisplay) {
      itemDisplay.quantity++;
    } else {
      itemDisplay = new OrderItem();
      itemDisplay.beerId = newProduct.id;
      itemDisplay.beerBeerName = newProduct.beerName;
      itemDisplay.beerAbv = newProduct.abv;
      itemDisplay.beerSize = newProduct.size;
      itemDisplay.beerStyle = newProduct.style;
      itemDisplay.unitPrice = newProduct.price;
      itemDisplay.beerBrewery = newProduct.brewery;
      itemDisplay.quantity = 1;

      this.orderDisplay.items.push(itemDisplay);
    }
  }
  public checkout() {
    if (!this.order.orderNumber) {
      this.order.orderNumber =
        this.order.orderDate.getFullYear().toString() +
        this.order.orderDate.getTime().toString();
    }
    this.newordernumber = this.order.orderNumber;
    return this.http
      .post('http://localhost:8888/api/orders', this.order, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      })
      .pipe(
        map(response => {
          this.order = new Order();
          this.orderDisplay = new Order();
          return true;
        }
        ));
  }

  public register(newUser: Registration) {
    const body: Registration = {
      firstName: newUser.firstName,
      password: newUser.password,
      email: newUser.email,
      lastName: newUser.lastName,
      username: newUser.email
    };
    return this.http.post('http://localhost:8888/api/Account/Register', body);
  }

  public showuserOrders(includeItems: boolean): Observable<boolean> {
    if (includeItems) {
      return this.http.get('http://localhost:8888/api/orders', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }).pipe(map((data: any[]) => {
        this.userOrders = data;
        return true;
      }));

    } else {
      return this.http.get('http://localhost:8888/api/orders?includeItems=false', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }).pipe(map((data: any[]) => {
        this.userOrders = data;
        return true;
      }));
    }
  }

  public specificorderpage(): Observable<boolean> {
    console.log(this.orderSelected + 'ORDER ID GOING TO ORDER PAGE');
    return this.http.get('http://localhost:8888/api/orders/' + this.orderSelected, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }).pipe(map((data: any) => {
        this.selectedOrder = data;
        return true;
      }));
  }

  public getorderbyordernumber(): Observable<boolean> {
    console.log(this.newordernumber);
    return this.http.get('http://localhost:8888/api/orders/' + this.newordernumber, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }).pipe(map((data: any) => {
        this.newOrder = data;
        console.log(this.newOrder.orderID);
        return true;
      }));
  }
}
