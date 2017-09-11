import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleInput from './../form_elements/redux_form_compatible_input';

const DefaultAllowance = () => (
  <Field
    disabled={false}
    name="defaultAllowance"
    label="Default allowance"
    type="number"
    min={0}
    step={0.01}
    component={ReduxFormCompatibleInput}
    validate={value => (value >= 0 ? undefined : 'Number must be above 0!')}
  />
);

DefaultAllowance.propTypes = {
  disabled: PropTypes.bool.isRequired
};

export default DefaultAllowance;
