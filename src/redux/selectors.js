export const getInventory = state => state.products.products;
export const getBasketItems = state => state.basket.basketItems;
export const getProductById = (state, productId) => state.products.products.find(product => product.id === productId)
export const getProductsPromo = (state, product) => []
export const getBasketItem = (state, props) => {
    const basketItemState = state.basket.basketItems.find(basketItem => basketItem.id === props.basketItem.id);
    const promos = getProductsPromo(state,basketItemState.productItem);
    return {
        "product": basketItemState.productItem.name,
        "price": `$${basketItemState.productItem.price} x ${basketItemState.quantity}`,
        "total": basketItemState.productItem.price * basketItemState.quantity,
        "promos": promos,
        "quantity": basketItemState.quantity
    }
}

export const getItemBasketByProduct = (state, productItem) => {
    return state.basket.basketItems.find(item => item.productItem.id === productItem.id);
}