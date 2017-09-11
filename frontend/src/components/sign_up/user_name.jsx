import React from 'react';
import { Field } from 'redux-form/immutable';
import ReduxFormCompatibleInput from './../form_elements/redux_form_compatible_input';

const Name = () => (
  <Field
    name="userName"
    label="Username"
    component={ReduxFormCompatibleInput}
    validate={value => (value ? undefined : 'Name is required!')}
  />
);

export default Name;
