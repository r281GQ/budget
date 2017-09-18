import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Account from './account';
import Transaction from './transaction_guard';
import Grouping from './grouping';
import Budget from './budget';
import Header from './header';
import Login from './login';
import SignUp from './sign_up';

import authAware from './auth_aware';

import { getAccounts } from './../store/action_creators/account';
import { getGroupings } from './../store/action_creators/grouping';
import { getBudgets } from './../store/action_creators/budget';
import { whoAmI } from './../store/action_creators/who_am_i';

import withTypeContainer from './model_container';

class App extends PureComponent {
  componentDidMount() {
    this.props.whoAmI();
    this.props.getAccounts();
    this.props.getGroupings();
    this.props.getBudgets();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      this.props.getAccounts();
      this.props.getGroupings();
      this.props.getBudgets();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/accounts" component={withTypeContainer('account')} />
        <Route path="/transaction/:id" component={Transaction} />
        <Route
          path="/transactions"
          component={withTypeContainer('transaction')}
        />
        <Route path="/account/:id" component={Account} />
        <Route path="/groupings" component={withTypeContainer('grouping')} />
        <Route path="/grouping/:id" component={Grouping} />
        <Route path="/budget/:id" component={Budget} />
        <Route path="/budgets" component={withTypeContainer('budget')} />
      </div>
    );
  }
}

App.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  getGroupings: PropTypes.func.isRequired,
  getBudgets: PropTypes.func.isRequired,
  whoAmI: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default authAware(
  connect(null, { getAccounts, getGroupings, getBudgets, whoAmI })(App)
);
