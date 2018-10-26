import ActionTypes from './ActionTypes';
import ApiCall from '../../services/apiService';


function getProductsSuccess(response) {
  return {
    type: ActionTypes.GET_PRODUCTS_SUCCESS, response,
  };
}

export function getProducts() {
  return (dispatch) => {
    // TODO: In future we can dispatch a request action to trigger the loading
    // API Call is an async call so we need to use async and await or promises here
    const products = ApiCall.getProducts().map(({ price, ...args }) => ({
      price: price.toJSON(),
      ...args,
    }));
    dispatch(getProductsSuccess(products));
  };
}

function getPromotionsSuccess(response) {
  return {
    type: ActionTypes.GET_PROMOTIONS_SUCCESS, response,
  };
}

export function getPromotions() {
  return (dispatch) => {
    // API Call is an async call so we need to use async and await or promises here
    const promotions = ApiCall.getPromotions();
    dispatch(getPromotionsSuccess(promotions));
  };
}

function getScannedItemsSuccess(response) {
  return {
    type: ActionTypes.GET_SCANNED_ITEMS_SUCCESS, response,
  };
}

export function getScannedItems() {
  return (dispatch) => {
    // API Call is an async call so we need to use async and await or promises here
    const scannedItems = ApiCall.getScannedItems();
    dispatch(getScannedItemsSuccess(scannedItems));
  };
}

function updateBasketSuccess(response) {
  return {
    type: ActionTypes.UPDATE_ITEM_BASKET_SUCCESS, response,
  };
}

export function updateBasket(basketItem, productId, quantity, decr) {
  return (dispatch) => {
    // API Call is an async call so we need to use async and await or promises here
    const updatedItem = ApiCall.updateBasket(basketItem, productId, quantity, decr);
    dispatch(updateBasketSuccess(updatedItem));
  };
}
