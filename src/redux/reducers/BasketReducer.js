
import Immutable from 'seamless-immutable';
import ActionTypes from '../actionCreators/ActionTypes';

const initialState = Immutable({
    scannedItems: []
});

export default function BasketReducer(state = initialState, action) {
    switch (action.type) {   
        case ActionTypes.UPDATE_ITEM_BASKET_SUCCESS:
            return Immutable.updateIn(state, ['scannedItems'], (items) => {
                return items.map((item) => {
                if (item.productId === action.response.productId) {
                    return action.response;
                }
                return item;
                });
            });
        case ActionTypes.GET_SCANNED_ITEMS_SUCCESS:
            // Group by response.product
            // set basketItems with accumulated quantities
            const mergedItems = action.response.reduce((acc, item) => {
                if (acc.has(item.productId)){
                    acc.set(item.productId, acc.get(item.productId) + item.quantity);
                }else{
                    acc.set(item.productId, item.quantity);
                }
                return acc;
            },new Map());

            const scannedItems = [];
            mergedItems.forEach((value, key) => {
                scannedItems.push({
                    "productId": key,
                    "quantity": value
                })
            });
            return Immutable.merge(state, { scannedItems: scannedItems});
        case ActionTypes.ADD_NEW_ITEM_BASKET_SUCCESS:
            return Immutable.merge(state, { scannedItems: [...state.scannedItems, action.response] });
        default:
            return state;
    }
}
