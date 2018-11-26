import {Brewery} from './products';
import * as _ from 'lodash';

export class OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  beerId: number;
  beerBeerName: string;
  beerSize: number;
  beerAbv: number;
  beerImageLink: string;
  beerStyle: string;
  beerBrewery: Brewery;
}

export class Order {
  orderID: number;
  orderDate: Date = new Date();
  orderNumber?: any;
  items: Array<OrderItem> = new Array<OrderItem>();

  get subtotal(): number {
    return _.sum(_.map(this.items, i => i.unitPrice * i.quantity));
  }
}
