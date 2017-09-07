import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';

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

const App = () => (
  <div>
    <Header />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />

    <Route path="/accounts" component={Accounts} />
    <Route path="/transaction/:id" component={Transaction} />
    <Route path="/transactions" component={Transactions} />
    <Route path="/account/:id" component={Account} />
    <Route path="/groupings" component={Groupings} />
    <Route path="/grouping/:id" component={Grouping} />
    <Route path="/budget/:id" component={Budget} />
    <Redirect to="/signup" />
  </div>
);

{/* <Route path="/budgets" component={Groupings} /> */}
App.propTypes = {};

export default App;
