import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import {logIn} from './../store/action_creators/auth'

import Login from './../components/login/login'

const LoginContainer = props => <div><Login handleSubmit = {props.handleSubmit} logIn = {props.logIn}/></div>

LoginContainer.propTypes = {
logIn: PropTypes.func
};

// export default LoginContainer;
export default connect(null, {logIn})(reduxForm({ form: 'login' })(LoginContainer));
