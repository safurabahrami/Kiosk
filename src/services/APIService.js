import * as data from './dataSource'
export default class APIService {
    constructor() {
        this._id = APIService.incrementId()
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 3
        else this.latestId++
        return this.latestId
    }

    static getProducts() {
        return data.products;
    }
    static addToBasket( product, quantity) {
        const createdItemObject = {
            "id": this.incrementId(),
            "productItem": product,
            "quantity": quantity
        }
        return createdItemObject;
    }
    static updateBasket(selectedItem, quantity, decr) {
        const updatedQuantity = decr
            ? Number.parseInt(selectedItem.quantity) - Number.parseInt(quantity)
            : Number.parseInt(quantity) + Number.parseInt(selectedItem.quantity);
        const updatedItemObject = {
            "id": selectedItem.id,
            "productItem": selectedItem.productItem,
            "quantity": updatedQuantity
        }
        return updatedItemObject;
    }
}
