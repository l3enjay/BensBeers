export interface Brewery {
  id: number;
  name: string;
  location: string;
  description: string;
  imageLink: string;
}

export interface BaseBeer {
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
