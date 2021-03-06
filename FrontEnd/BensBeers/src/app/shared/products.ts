export class Brewery {
  id: number;
  name: string;
  location: string;
  description: string;
  imageLink: string;
}

export class BaseBeer {
  id: number;
  beerName: string;
  style: string;
  abv: number;
  size: number;
  price: number;
  description: string;
  imageLink: string;
  brewery: Brewery;
}
