import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style/App.css';
import SelfCheckoutComponent from './components/SelfCheckoutComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SelfCheckoutComponent />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps)(App);
