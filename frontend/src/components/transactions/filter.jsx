import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Form, Button } from 'semantic-ui-react';
import { Field } from 'redux-form/immutable';
import FilterItem from './fitler_item';
import SearchBar from './search_bar';
import Ff from './../form_elements/redux_form_compatible_input';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: unset;
    border: none;
    margin: 0px;
    box-shadow: unset;
    @media (max-width: 768px) {
      width: 100% !important;
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

const Filter = ({ accounts, budgets, groupings, handleFormSubmit }) => (
  <StyledMenu vertical size="large" borderless>
    <Form onSubmit={handleFormSubmit}>
      <FilterItem type="account" collection={accounts} />
      <FilterItem type="grouping" collection={groupings} />
      <FilterItem type="budget" collection={budgets} />
      <FilterItem type="date" collection={[]} />
      <SearchBar />
      <Menu.Item>
        <Field name="last" min={0} type="number" placeholder="last" component={Ff} />
      </Menu.Item>
      <Menu.Item>
        <Button fluid type="submit">
          Search
        </Button>
      </Menu.Item>;
    </Form>
  </StyledMenu>
);

Filter.propTypes = {
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  budgets: PropTypes.any,
  handleFormSubmit: PropTypes.any
};

export default Filter;
