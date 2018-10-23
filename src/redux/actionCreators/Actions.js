import * as types from './ActionTypes';
import ApiCall from '../../services/APIService';

function updateLoadingState(type) {
    return {
      type,
    };
}

function getProductsSuccess(products) {
    return {
      type: types.GET_PRODUCTS_SUCCESS, products,
    };
  }

export function getProducts() {
    return (dispatch) => {
        dispatch(updateLoadingState(types.GET_PRODUCTS_REQUEST));
        // API Call is an async call so we need to use async and await or promises here 
        const products = ApiCall.getProducts();
        dispatch(getProductsSuccess(products));
        
    };
}

function getScannedItemsSuccess(response) {
    return {
      type: types.GET_SCANNED_ITEMS_SUCCESS, response,
    };
  }

export function getScannedItems() {
    return (dispatch) => {
        dispatch(updateLoadingState(types.GET_SCANNED_ITEMS_REQUEST));
        // API Call is an async call so we need to use async and await or promises here 
        const scannedItems = ApiCall.getScannedItems();
        dispatch(getScannedItemsSuccess(scannedItems));
        
    };
}

function updateBasketSuccess(response) {
    return {
      type: types.UPDATE_ITEM_BASKET_SUCCESS, response,
    };
}

export function updateBasket(basketItem, productId, quantity, decr) {
    return (dispatch) => {
        dispatch(updateLoadingState(types.UPDATE_ITEM_BASKET_REQUEST));
        // API Call is an async call so we need to use async and await or promises here 
        const updatedItem = ApiCall.updateBasket(basketItem, productId, quantity, decr);
        dispatch(updateBasketSuccess(updatedItem));
    };
}