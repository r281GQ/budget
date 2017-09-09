import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


import Account from './account';

import Transaction from './transaction';

import Grouping from './grouping';


import Budget from './budget';
// import Groupings from './groupings';

import Header from './header';

import Login from './login';
import SignUp from './sign_up';

import { getAccounts } from './../store/action_creators/account';
import { getGroupings } from './../store/action_creators/grouping';
import {whoAmI}  from './../store/action_creators/who_am_i';

import withTypeContainer from './model_container';

class App extends React.PureComponent {
  componentDidMount() {
    console.log('sdfsd');
    this.props.whoAmI();
    this.props.getAccounts();
    this.props.getGroupings();
  }

  render() {
    return (
      <div>
        <Header />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/accounts" component={withTypeContainer('account')} />
        <Route path="/transaction/:id" component={Transaction} />
        <Route path="/transactions" component={withTypeContainer('transaction')} />
        <Route path="/account/:id" component={Account} />
        <Route path="/groupings" component={withTypeContainer('grouping')} />
        <Route path="/grouping/:id" component={Grouping} />
        <Route path="/budget/:id" component={Budget} />
        <Route path="/budgets" component={Budget} />
      </div>
    );
  }
}

App.propTypes = {
  getAccounts: PropTypes.func,
  getGroupings: PropTypes.func,
  whoAmI: PropTypes.func
};

export default connect(null, { getAccounts, getGroupings,whoAmI })(App);
