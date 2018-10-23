export const validateAdd = (quantity, basketItem, productInventory) => {
    if (!quantity || Number.parseInt(quantity) === 0
        || (basketItem &&  Number.parseInt(quantity) +  Number.parseInt(basketItem.quantity) > productInventory)
        || (quantity > productInventory)){
        return true;
    }
    return false;
};
const validateItemInBasket = (quantity, basketItemQuantity) => {
    return quantity > 0 && basketItemQuantity >= quantity;
};
export const validateRemove = (quantity, basketItem) => {
    if (!quantity || !basketItem || !validateItemInBasket(quantity,basketItem.quantity)){
        return true;
    }
    return false;
};
