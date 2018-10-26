export const validateAdd = (quantity, basketItem, productInventory) => {
  if (!quantity || Number.parseInt(quantity, 10) === 0
        || (basketItem && Number.parseInt(quantity, 10) + Number.parseInt(basketItem.quantity, 10) > productInventory)
        || (quantity > productInventory)) {
    return false;
  }
  return true;
};

const validateItemInBasket = (quantity, basketItemQuantity) => quantity > 0 && basketItemQuantity >= quantity;
export const validateRemove = (quantity, basketItem) => {
  if (!quantity || !basketItem || !validateItemInBasket(quantity, basketItem.quantity)) {
    return false;
  }
  return true;
};
