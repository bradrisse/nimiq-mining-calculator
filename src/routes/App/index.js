import React, { Component } from 'react';
import Header from 'components/Header';
import Calculator from 'components/Calculator';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Header/>
          <Calculator/>
      </div>
    );
  }
}

export default App;
