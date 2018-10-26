import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './style/index.css';
import * as serviceWorker from './serviceWorker';
import { customizedThemes } from './style/style';
import { store } from './redux/configureStore';
import SelfCheckout from './components/SelfCheckout';

const theme = createMuiTheme(customizedThemes);
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SelfCheckout />
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
