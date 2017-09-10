import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Auth = ({ logOut, isAuthenticated }) =>
  isAuthenticated ? (
    <Menu.Menu position="right">
      <Menu.Item content="Endre" />
      <Menu.Item content="LogOut" icon="log out" onClick={logOut} />
    </Menu.Menu>
  ) : (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/signup" content="Sign up" icon="add user" />
      <Menu.Item as={Link} to="/login" content="Log in" icon="home" />
    </Menu.Menu>
  );

Auth.propTypes = {
  isAuthenticated: PropTypes.bool,
  logOut: PropTypes.func.isRequired
};

export default Auth;
