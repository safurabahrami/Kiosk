export const getInventory = state => state.products.products;
export const getBasketItems = state => state.basket.basketItems;
export const getProductById = (state, productId) => state.products.products.find(product => product.id === productId)
export const getProductsPromo = (state, product) => []
export const getBasketItem = (state, props) => {
    const basketItemState = state.basket.basketItems.find(basketItem => basketItem.id === props.basketItem.id);
    const promos = getProductsPromo(state, basketItemState.productItem);
    return {
        "product": basketItemState.productItem.name,
        "price": `$${basketItemState.productItem.price} x ${basketItemState.quantity}`,
        "total": toFixedPrecision(basketItemState.productItem.price * basketItemState.quantity,2),
        "promos": promos,
        "quantity": basketItemState.quantity
    }
}

export const getItemBasketByProduct = (state, productItem) => {
    return state.basket.basketItems.find(item => item.productItem.id === productItem.id);
}

export const getProductInventory = (state, productItem) => {
    return productItem.inventory;
}

const toFixedPrecision = function(num, precision) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}