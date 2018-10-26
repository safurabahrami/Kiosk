import Immutable from 'seamless-immutable';

import { applyPromotion } from '../services/promotionService';
import { mapProductJSONMoneyFunc } from '../utilities';
import Money from '../Money';

export const getInventory = state => state.products.products.map(mapProductJSONMoneyFunc);
export const getScannedItems = state => state.basket.scannedItems;
export const getBasketItems = state => state.basket.scannedItems.filter(item => item.quantity !== 0);
export const getProductById = (state, productId) => {
  const product = state.products.products.find(product => product.id === productId);
  return mapProductJSONMoneyFunc(product);
};
export const getPromotionByProductId = (state, productId) => state.products.promotions.find(promo => promo.payload.productId === productId);

export const getBasketItem = (state, productId) => {
  const basketItemState = getBasketItemByProductId(state, productId);
  const product = getProductById(state, basketItemState.productId);
  const promo = getPromotionByProductId(state, basketItemState.productId);
  return {
    productName: product.name,
    price: product.price,
    total: product.price.multiply(basketItemState.quantity),
    promo,
    quantity: basketItemState.quantity,
  };
};

export const getItemBasketByProduct = (state, productItem) => state.basket.scannedItems.find(item => item.productId === productItem.id);

export const getProductInventory = (state, productItem) => productItem.inventory;

export const getProductInventoryByProductId = (state, productId) => parseInt(getProductById(state, productId).inventory, 10);

export const getBasketItemByProductId = (state, productId) => state.basket.scannedItems.find(item => item.productId === productId);
export const getProductIds = state => state.products.products.map(item => item.id);

export const getScannedProductIds = state => state.basket.scannedItems.map(item => item.productId);
export const getBasketProductIds = state => getBasketItems(state).map(item => item.productId);

const getProductList = f => ((state) => {
  const productIds = f(state);
  const allProducts = getInventory(state);
  return Immutable.asMutable(allProducts)
    .filter(product => productIds.find(scannedId => scannedId === product.id))
    .sort((p1, p2) => p1.name > p2.name)
    .map(filteredItem => filteredItem.id);
});


export const getSortedBasketProductIds = getProductList(getBasketProductIds);
export const getSortedScannedProductIds = getProductList(getScannedProductIds);

export const getBasketSubTotalPrice = (state) => {
  const basketItems = getBasketItems(state);
  if (!basketItems || basketItems.length === 0) {
    return Money.fromNumber(0.00);
  }
  return basketItems.asMutable().reduce((acc, item) => {
    const product = getProductById(state, item.productId);
    return product.price.multiply(item.quantity).add(acc);
  }, Money.fromNumber(0.00));
};

export const getTotalDiscount = (state) => {
  const basketItems = getBasketItems(state);
  if (!basketItems || basketItems.length === 0) {
    return Money.fromNumber(0.00);
  }
  return basketItems.asMutable().reduce((acc, item) => {
    const promotion = getPromotionByProductId(state, item.productId);
    if (promotion) {
      const basketItem = getBasketItem(state, item.productId);
      const { promoTotal } = applyPromotion(promotion, basketItem);
      return acc.add(promoTotal);
    }
    return acc;
  }, Money.fromNumber(0.00));
};
