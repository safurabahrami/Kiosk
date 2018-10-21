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