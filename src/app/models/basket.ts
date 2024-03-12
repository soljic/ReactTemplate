import { List } from "immutable";

export interface CustomerBasket {
    id: string;
    items: List<BasketItem> | null;
    deliveryMethodId: number | null;
    clientSecret: string;
    paymentIntentId: string;
    shippingPrice: number;
  }

  export class CustomerBasket implements CustomerBasket {
    
  }

  export class BasketItem {
    id: number = 0 ;
    productName: string = '';
    price: number = 0;
    quantity: number = 0;
    pictureUrl: string = '';
    brand: string = '';
    type: string = '';
  }