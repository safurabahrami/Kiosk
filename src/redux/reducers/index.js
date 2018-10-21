import { combineReducers } from 'redux';
import products from './ProductsReducer';
import loading from './LoadingReducer';

const RootReducer = combineReducers({
    products,
    loading
});
export default RootReducer;
