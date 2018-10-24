
import Immutable from 'seamless-immutable';
import * as types from '../actionCreators/ActionTypes';

const initialState = Immutable({
    products: [],
    promotions: []
});

export default function ProductsReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_PRODUCTS_SUCCESS:
            return Immutable.merge(state, { products: action.response });
        case types.GET_PROMOTIONS_SUCCESS:
            return Immutable.merge(state, { promotions: action.response });
        default:
            return state;
    }
}
