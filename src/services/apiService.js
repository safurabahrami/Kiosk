import * as data from '../resources/dataSource'
import Money from '../Money';

export default class APIService {

    static getProducts() {
        const products = data.products;
        //convert prices to Money
        return products.map(({price, ...args}) => ({
            price: Money.fromNumber(price),
            ...args
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
            "productId": productId,
            "quantity": (basketItem ? Number.parseInt(basketItem.quantity) : 0) + Number.parseInt(quantity)
        }
        return createdItemObject;
    }
    static updateBasket(basketItem, productId, quantity, decr) {
        const updatedQuantity = decr
            ? Number.parseInt(basketItem.quantity) - Number.parseInt(quantity)
            : Number.parseInt(quantity) + Number.parseInt(basketItem.quantity);
        const updatedItemObject = {
            "productId": productId,
            "quantity": updatedQuantity
        }
        return updatedItemObject;
    }
}
