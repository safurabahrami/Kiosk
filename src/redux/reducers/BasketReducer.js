
import Immutable from 'seamless-immutable';
import * as types from '../actionCreators/ActionTypes';

const initialState = Immutable({
    basketItems: [
        {
            "id": 1,
            "productItem": {
                "id": 1,
                "name": "Apple",
                "price": 0.9,
                "inventory": 10
            },
            "quantity": 2
        },
        {
            "id": 2,
            "productItem": {
                "id": 4,
                "name": "Sour Cherry",
                "price": 2.5,
                "inventory": 15
            },
            "quantity": 5
        }
    ]
});

export default function BasketReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_ITEM_BASKET_SUCCESS:
            return Immutable.merge(state, { basketItems: [...state.basketItems, action.response] });
        case types.UPDATE_ITEM_BASKET_SUCCESS:
            return Immutable.updateIn(state, ['basketItems'], (items) => {
                return items.map((item) => {
                if (item.id === action.response.id) {
                    return action.response;
                }
                return item;
                });
            });
        case types.REMOVE_ITEM_BASKET_SUCCESS:
            return Immutable.update(state, ['basketItems'], (items) => {
                return items.filter(item => item.id !== action.response.id)
            });
        default:
            return state;
    }
}