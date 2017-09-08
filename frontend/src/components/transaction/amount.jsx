import React from 'react';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleInput from './../form_elements/redux_form_compatible_input';

const Amount = () => (
  <Field
    name="amount"
    label="Amount"
    type="number"
    component={ReduxFormCompatibleInput}
    validate={value => (value > 0 ? undefined : 'Number must above 0!')}
  />
);

export default Amount;
