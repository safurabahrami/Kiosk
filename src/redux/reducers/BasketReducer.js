
import Immutable from 'seamless-immutable';

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
        default:
            return state;
    }
}