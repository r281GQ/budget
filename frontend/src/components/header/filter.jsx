import React from 'react';
import PropTypes from 'prop-types';

import FilterItem from './fitler_item';
import SearchBar from './search_bar';
import HeaderContainer from './header_container';

const Filter = ({ isAuthenticated, history, accounts, budgets, groupings }) =>
  isAuthenticated && history.location.pathname === '/transactions' ? (
    <HeaderContainer borderless>
      <FilterItem type="account" collection={accounts} />
      <FilterItem type="grouping" collection={groupings} />
      <FilterItem type="budget" collection={budgets} />
      <FilterItem type="date" collection={[]} />
      <SearchBar />
    </HeaderContainer>
  ) : null;

Filter.propTypes = {
  isAuthenticated: PropTypes.bool,
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any
};

export default Filter;
