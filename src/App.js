import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style/App.css';
import SelfCheckout from './components/SelfCheckout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SelfCheckout />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps)(App);
