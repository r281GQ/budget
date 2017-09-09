import React from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleInput from './../form_elements/redux_form_compatible_input';

const InitialBalance = ({disabled}) => (
  <Field
    disabled = {disabled}
    name="initialBalance"
    label="InitialBalance"
    type="number"
    min={0}
    step={0.01}
    component={ReduxFormCompatibleInput}
    validate={value => (value >= 0 ? undefined : 'Number must above 0!')}
  />
);

InitialBalance.propTypes = {
  disabled: PropTypes.func
};

export default InitialBalance;
