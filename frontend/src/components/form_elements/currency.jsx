import React from 'react';
import PropTypes from 'prop-types';

import ReduxFormCompatibleDropDown from './redux_form_compatible_drop_down';
import { Field } from 'redux-form/immutable';

const Currency = ({ currencies, disabled }) => (
  <Field
    disabled={disabled}
    name="currency"
    label="Currency"
    component={ReduxFormCompatibleDropDown}
    options={currencies}
  />
);

Currency.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.string
    })
  ),
  disabled: PropTypes.bool
};

export default Currency;
