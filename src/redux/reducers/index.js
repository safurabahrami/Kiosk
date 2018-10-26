import { combineReducers } from 'redux';

import products from './ProductsReducer';
import basket from './BasketReducer';

const RootReducer = combineReducers({
  products,
  basket,
});
export default RootReducer;
