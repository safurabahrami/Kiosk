import Immutable from 'seamless-immutable';

export const getInventory = state => state.products.products;
export const getScannedItems = state => state.basket.scannedItems;
export const getBasketItems = state => state.basket.scannedItems.filter(item => item.quantity !==0);
export const getProductById = (state, productId) => state.products.products.find(product => product.id === productId)
export const getProductsPromo = (state, productId) => []
export const getBasketItem = (state, productId) => {
    const basketItemState = state.basket.scannedItems.find(item => item.productId === productId);
    const product = getProductById(state, basketItemState.productId);
    const promos = getProductsPromo(state, basketItemState.productId);
    return {
        "product": product.name,
        "price": `$${product.price} x ${basketItemState.quantity}`,
        "total": toFixedPrecision(product.price * basketItemState.quantity,2),
        "promos": promos,
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
    return getProductById(state, productId).inventory;
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
    return 0;
}

export const getTotalDiscount = state => 0;



// Ref: https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
// Test in jsfiddle: http://jsfiddle.net/cCX5y/3/
export const toFixedPrecision = function(num, precision) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}