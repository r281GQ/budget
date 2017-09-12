import React from 'react';
import PropTypes from 'prop-types';
import ModelForm from './../model_form';

import Email from './../form_elements/email';
import Password from './../form_elements/password';

const Login = ({ handleFormSubmit, invalid, dirty, RenderMessage, error }) => (
  <ModelForm
    error={error}
    RenderMessage = {RenderMessage}
    name="Log in"
    icon="home"
    handleFormSubmit={handleFormSubmit}
    invalid={invalid && dirty}
  >
    <Email />
    <Password />
  </ModelForm>
);

Login.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool,
  RenderMessage: PropTypes.any,
  error: PropTypes.any
};

export default Login;
