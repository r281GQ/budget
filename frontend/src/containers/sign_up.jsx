import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { signUp } from './../store/action_creators/auth';

import SignUp from './../components/sign_up/sign_up';

const SignUpContainer = props => <SignUp {...props} />;

SignUpContainer.propTypes = {};

export default connect(null, { signUp })(
  reduxForm({ form: 'signup' })(SignUpContainer)
);
