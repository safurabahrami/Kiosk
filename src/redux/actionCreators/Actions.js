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
        const products = ApiCall.getMethod();
        dispatch(getProductsSuccess(products));
        
    };
}

function addToBasketSuccess(response) {
    return {
      type: types.ADD_ITEM_BASKET_SUCCESS, response,
    };
}

export function addToBasket(product, quantity) {
    return (dispatch) => {
        dispatch(updateLoadingState(types.ADD_ITEM_BASKET_REQUEST));
        // API Call is an async call so we need to use async and await or promises here 
        const addedItem = ApiCall.addToBasket(product, quantity);
        dispatch(addToBasketSuccess(addedItem));
    };
}

function updateBasketSuccess(response) {
    return {
      type: types.UPDATE_ITEM_BASKET_SUCCESS, response,
    };
}

export function updateBasket(basketItem, quantity, decr) {
    return (dispatch) => {
        dispatch(updateLoadingState(types.UPDATE_ITEM_BASKET_REQUEST));
        // API Call is an async call so we need to use async and await or promises here 
        const updatedItem = ApiCall.updateBasket(basketItem, quantity, decr);
        dispatch(updateBasketSuccess(updatedItem));
    };
}

function removeFromBasketSuccess(response) {
    return {
      type: types.REMOVE_ITEM_BASKET_SUCCESS, response,
    };
}

export function removeFromBasket(basketItem) {
    return (dispatch) => {
        dispatch(updateLoadingState(types.REMOVE_ITEM_BASKET_REQUEST));
        // API Call is an async call so we need to use async and await or promises here 
        dispatch(removeFromBasketSuccess(basketItem));
    };
}