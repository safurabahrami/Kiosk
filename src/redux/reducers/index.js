import { combineReducers } from 'redux';
import products from './ProductsReducer';
import loading from './LoadingReducer';
import basket from './BasketReducer';

const RootReducer = combineReducers({
    products,
    loading,
    basket
});
export default RootReducer;