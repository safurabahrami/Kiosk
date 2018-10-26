
import Immutable from 'seamless-immutable';
import ActionTypes from '../actionCreators/ActionTypes';

const initialState = Immutable({
  loading: 0,
});

export default function LoadingReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_REQUEST:
      return Immutable.merge(state, { loading: state.loading + 1 });
    case ActionTypes.GET_PRODUCTS_SUCCESS:
    case ActionTypes.GET_PRODUCTS_FAILURE:
      return Immutable.merge(state, { loading: state.loading - 1 });
    default:
      return state;
  }
}
