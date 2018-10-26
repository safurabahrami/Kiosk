import * as data from '../resources/dataSource';
import Money from '../Money';

export default class APIService {
  static getProducts() {
    const { products } = data;
    // convert prices to Money
    return products.map(({ price, ...args }) => ({
      price: Money.fromNumber(price),
      ...args,
    }));
  }

  static getScannedItems() {
    return data.scanned;
  }

  static getPromotions() {
    return data.promotions;
  }


  static addToBasket(basketItem, productId, quantity) {
    const createdItemObject = {
      productId,
      quantity: (basketItem ? Number.parseInt(basketItem.quantity, 10) : 0) + Number.parseInt(quantity, 10),
    };
    return createdItemObject;
  }

  static updateBasket(basketItem, productId, quantity, decr) {
    const updatedQuantity = decr
      ? Number.parseInt(basketItem.quantity, 10) - Number.parseInt(quantity, 10)
      : Number.parseInt(quantity, 10) + Number.parseInt(basketItem.quantity, 10);
    const updatedItemObject = {
      productId,
      quantity: updatedQuantity,
    };
    return updatedItemObject;
  }
}
