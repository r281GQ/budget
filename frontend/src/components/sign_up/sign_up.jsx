import React from 'react';
import PropTypes from 'prop-types';

import ModelForm from './../model_form';
import Email from './../form_elements/email';
import Name from './../form_elements/name';
import Password from './../form_elements/password';
import PasswordAgain from './../form_elements/password_again';

const SignUp = ({ handleFormSubmit, invalid, dirty }) => (
  <ModelForm
    name="Sign up"
    icon="add user"
    handleFormSubmit={handleFormSubmit}
    invalid={invalid && dirty}
  >
    <Name />
    <Email />
    <Password />
    <PasswordAgain />
  </ModelForm>
);

SignUp.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool
};

export default SignUp;
