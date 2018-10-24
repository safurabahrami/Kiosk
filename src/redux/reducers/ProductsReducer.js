
import Immutable from 'seamless-immutable';
import ActionTypes from '../actionCreators/ActionTypes';

const initialState = Immutable({
    products: [],
    promotions: []
});

export default function ProductsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            return Immutable.merge(state, { products: action.response });
        case ActionTypes.GET_PROMOTIONS_SUCCESS:
            return Immutable.merge(state, { promotions: action.response });
        default:
            return state;
    }
}
