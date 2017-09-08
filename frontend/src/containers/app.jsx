import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Accounts from './accounts';
import Account from './account';

import Transaction from './transaction';
import Transactions from './transactions';

import Grouping from './grouping';
import Groupings from './groupings';

import Budget from './budget';
// import Groupings from './groupings';

import Header from './header';

import Login from './login';
import SignUp from './sign_up';

import { getAccounts } from './../store/action_creators/account';
import { getGroupings } from './../store/action_creators/grouping';

import withTypeContainer from './model_container';

class App extends React.PureComponent {
  componentDidMount() {
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
        <Route path="/transactions" component={Transactions} />
        <Route path="/account/:id" component={Account} />
        <Route path="/groupings" component={withTypeContainer('grouping')} />
        <Route path="/grouping/:id" component={Grouping} />
        <Route path="/budget/:id" component={Budget} />
        <Redirect to="/login" />
      </div>
    );
  }
}

{
  /* <Route path="/budgets" component={Groupings} /> */
}
App.propTypes = {
  getAccounts: PropTypes.func,
  getGroupings: PropTypes.func
};

export default connect(null, { getAccounts, getGroupings })(App);
