import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Search } from 'semantic-ui-react';

import Auth from './auth';
import Navigation from './navigation';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: unset;
    border: none;
    margin: 0px;
    box-shadow: unset;
  }
`;

const Navbar = props => (
  <StyledMenu borderless size="massive" stackable>
    <Navigation {...props} />
    <Auth {...props} />
  </StyledMenu>
);

Navbar.propTypes = {
  linkName: PropTypes.string,
  linkType: PropTypes.string,
  logOut: PropTypes.func.isRequired
};

export default Navbar;
