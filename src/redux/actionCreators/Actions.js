import ActionTypes from './ActionTypes';
import ApiCall from '../../services/apiService';

function updateLoadingState(type) {
  return {
    type,
  };
}

function getProductsSuccess(response) {
  return {
    type: ActionTypes.GET_PRODUCTS_SUCCESS, response,
  };
}

export function getProducts() {
  return (dispatch) => {
    dispatch(updateLoadingState(ActionTypes.GET_PRODUCTS_REQUEST));
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
    dispatch(updateLoadingState(ActionTypes.GET_PROMOTIONS_REQUEST));
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
    dispatch(updateLoadingState(ActionTypes.GET_SCANNED_ITEMS_REQUEST));
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
    dispatch(updateLoadingState(ActionTypes.UPDATE_ITEM_BASKET_REQUEST));
    // API Call is an async call so we need to use async and await or promises here
    const updatedItem = ApiCall.updateBasket(basketItem, productId, quantity, decr);
    dispatch(updateBasketSuccess(updatedItem));
  };
}
