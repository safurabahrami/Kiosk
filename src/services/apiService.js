import * as data from '../resources/dataSource'
export default class APIService {

    static getProducts() {
        return data.products;
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
