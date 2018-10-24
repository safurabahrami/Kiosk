import Immutable from 'seamless-immutable';
import { toFixedPrecision, applyPromotion} from '../helper';

export const getInventory = state => state.products.products;
export const getScannedItems = state => state.basket.scannedItems;
export const getBasketItems = state => state.basket.scannedItems.filter(item => item.quantity !==0);
export const getProductById = (state, productId) => state.products.products.find(product => product.id === productId)
export const getPromotionByProductId = (state, productId) => {
    return state.products.promotions.find(promo => promo.payload.productId === productId);
}
export const getBasketItem = (state, productId) => {
    const basketItemState = state.basket.scannedItems.find(item => item.productId === productId);
    const product = getProductById(state, basketItemState.productId);
    const promo = getPromotionByProductId(state, basketItemState.productId);
    return {
        "productName": product.name,
        "price": `$${product.price} x ${basketItemState.quantity}`,
        "total": toFixedPrecision(product.price * basketItemState.quantity,2),
        "promo": promo,
        "quantity": basketItemState.quantity
    }
}

export const getItemBasketByProduct = (state, productItem) => {
    return state.basket.scannedItems.find(item => item.productId === productItem.id);
}

export const getProductInventory = (state,productItem) => {
    return productItem.inventory;
}

export const getProductInventoryByProductId = (state, productId) => {
    return parseInt(getProductById(state, productId).inventory);
}

export const getItemBasketByProductId = (state, productId) => {
    return state.basket.scannedItems.find(item => item.productId === productId);
}
export const getProductIds = state => state.products.products.map((item)=>item.id)

export const getScannedProductIds = state => state.basket.scannedItems.map((item)=>item.productId)
export const getBasketProductIds = state => getBasketItems(state).map((item) => item.productId)

export const getSortedScannedProductIds = state => {
    const scannedProductIds = getScannedProductIds(state);
    const allProducts = getInventory(state);
    return Immutable.asMutable(allProducts).sort((p1,p2) => p1.name > p2.name)
        .filter(product => scannedProductIds.find((scannedId) => scannedId === product.id))
        .map(filteredItem => filteredItem.id)
}
export const getSortedBasketProductIds = state => {
    const basketProductIds = getBasketProductIds(state);
    const allProducts = getInventory(state);
    return Immutable.asMutable(allProducts).sort((p1,p2) => p1.name > p2.name)
        .filter(product => basketProductIds.find((scannedId) => scannedId === product.id))
        .map(filteredItem => filteredItem.id)
}
export const getBasketSubTotalPrice = state => {
    const basketItems = getBasketItems(state);
    if (basketItems && basketItems.length > 0) {
        return toFixedPrecision(basketItems.reduce((acc,item) => {
            const product = getProductById(state, item.productId)
            return product.price * item.quantity  + acc;
        },0),2);
    }
    return toFixedPrecision(0, 2);
}

export const getTotalDiscount = state => {
    const basketItems = getBasketItems(state);
    if (basketItems && basketItems.length > 0) {
        return toFixedPrecision(basketItems.reduce((acc,item) => {
            const basketItem = getBasketItem(state, item.productId)
            const promotion = getPromotionByProductId(state, item.productId);
            if (promotion) {
                const { promoTotal } = applyPromotion(promotion, basketItem);
                return Number.parseFloat(promoTotal) + acc;
            }
            return acc;
        },0),2);
    }
    return toFixedPrecision(0,2)
};


