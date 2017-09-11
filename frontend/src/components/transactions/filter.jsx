import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

import FilterItem from './fitler_item';
import SearchBar from './search_bar';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: unset;
    border: none;
    margin: 0px;
    box-shadow: unset;
    @media (max-width: 768px) {
      width: 100%!important;
    }
    @media (min-width: 768px) {

      float: left;
      margin: 0 0.5rem 0 0;
      ::after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
    }
  }
`;

const Filter = ({ accounts, budgets, groupings }) => (
  <StyledMenu vertical size="large" borderless>
    <FilterItem type="account" collection={accounts} />
    <FilterItem type="grouping" collection={groupings} />
    <FilterItem type="budget" collection={budgets} />
    <FilterItem type="date" collection={[]} />
    <SearchBar />
  </StyledMenu>
);

Filter.propTypes = {
  isAuthenticated: PropTypes.bool,
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any
};

export default Filter;
