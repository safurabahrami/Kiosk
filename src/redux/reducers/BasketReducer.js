
import Immutable from 'seamless-immutable';
import * as types from '../actionCreators/ActionTypes';

const groupScanItemsByProduct = (list, groupGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = groupGetter(item);
        if (!map.has(key)) {
            map.set(key, [item]);
        } else {
            map.get(key).push(item);
        }
    });
    return map;
}

const initialState = Immutable({
    scannedItems: []
});

export default function BasketReducer(state = initialState, action) {
    switch (action.type) {   
        case types.UPDATE_ITEM_BASKET_SUCCESS:
            return Immutable.updateIn(state, ['scannedItems'], (items) => {
                return items.map((item) => {
                if (item.productId === action.response.productId) {
                    return action.response;
                }
                return item;
                });
            });
        case types.GET_SCANNED_ITEMS_SUCCESS:
            // Group by response.product
            // set basketItems with accumulated quantities
            const groupedScannedItems = groupScanItemsByProduct(action.response, row => row.productId);
            let basketItemFromScanned = [];
            groupedScannedItems.forEach((value, key) => {
                const quantity = value.reduce((acc,item) => item.quantity + acc, 0);
                const basketItem = {
                    "productId": key,
                    "quantity": quantity || 0
                }
                basketItemFromScanned.push(basketItem)
            })
            return Immutable.merge(state, { scannedItems: basketItemFromScanned});
        case types.ADD_NEW_ITEM_BASKET_SUCCESS:
            return Immutable.merge(state, { scannedItems: [...state.scannedItems, action.response] });
        default:
            return state;
    }
}
