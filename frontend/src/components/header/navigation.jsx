import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navigation = props =>
  props.isAuthenticated ? (
    <Menu.Menu position="left">
      {props.linkType === 'create' ? (
        <Menu.Item
          as={Link}
          to={`/${props.linkName}/0`}
          content="Create"
          icon="plus circle"
        />
      ) : (
        <Menu.Item
          as={Link}
          to={`/${props.linkName}`}
          content="List items"
          icon="browser"
        />
      )}
      <Menu.Item
        as={Link}
        to="/transactions"
        content="Transactions"
        icon="usd"
      />
      <Menu.Item as={Link} to="/accounts" content="Accounts" icon="currency" />
      <Menu.Item as={Link} to="/groupings" content="Groupings" icon="id card" />
      <Menu.Item
        as={Link}
        to="/budgets"
        content="Budgets"
        icon="checked calendar"
      />
    </Menu.Menu>
  ) : null;

Navigation.propTypes = {
  linkName: PropTypes.string,
  linkType: PropTypes.string,
  logOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default Navigation;
