import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleDropDown from './../form_elements/redux_form_compatible_drop_down';

const Account = ({ accounts }) => (
  <Field
    name="account"
    label="Account"
    component={ReduxFormCompatibleDropDown}
    options={accounts}
  />
);

Account.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      value: PropTypes.string
    })
  )
};

export default Account;
