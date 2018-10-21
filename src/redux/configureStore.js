import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import RootReducer from './reducers';

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

export const store = createStore(RootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
));