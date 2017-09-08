import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { Redirect } from 'react-router-dom';

import { logIn } from './../store/action_creators/auth';

import Login from './../components/login/login';

const LoginContainer = props =>
  props.isAuthenticated ? (
    <Redirect to="/transactions" />
  ) : (
    <Login handleSubmit={props.handleSubmit} logIn={props.logIn} />
  );

LoginContainer.propTypes = {
  logIn: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
  };
};

export default connect(mapStateToProps, { logIn })(
  reduxForm({ form: 'login' })(LoginContainer)
);
