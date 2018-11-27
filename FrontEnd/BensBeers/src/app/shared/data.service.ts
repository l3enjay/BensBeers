import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BaseBeer} from './products';
import {Order, OrderItem} from './order';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public order: Order = new Order();
  public orderDisplay : Order = new Order();

  public products: BaseBeer[] = [];

  private token = '';
  private tokenExpiration: Date;

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

  loadProducts(): Observable<boolean> {
    return this.http.get('http://localhost:8888/api/products').pipe(
      map((data: any[]) => {
        this.products = data;
        return true;
      })
    );
  }

  public addToOrder(newProduct: BaseBeer) {
    let item: OrderItem = this.order.items.find(o => o.beerId === newProduct.id);
    if (item) {
      item.quantity++;
    } else {
      item = new OrderItem();
      item.beerId = newProduct.id
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
      itemDisplay.beerId = newProduct.id
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
    return this.http
      .post('http://localhost:8888/api/orders', this.order, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      })
      .pipe(
        map(response => {
          this.order = new Order();
          return true;
        },
          tap(m => console.log('Model is:', this.order.orderID))
      ));
  }
}
