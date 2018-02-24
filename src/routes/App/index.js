import React, { Component } from 'react';
import Header from 'components/Header';
import Calculator from 'components/Calculator';
import {compose} from 'recompose';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as cmcActions} from "ducks/cmc";
import './App.css';

class App extends Component {

  componentWillMount() {
      this.props.cmcActions.fetchNim()
  }

  render() {
    return (
      <div>
          <Header/>
          <Calculator/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        cmc: state.cmc
    };
}

function mapPropsToDispatch(dispatch) {
    return {
        cmcActions: bindActionCreators(cmcActions, dispatch)
    };
}

export default compose(
    connect(mapStateToProps, mapPropsToDispatch)
)(App);
