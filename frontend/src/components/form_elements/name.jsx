import React from 'react';

import { Field } from 'redux-form/immutable';
import ReduxFormCompatibleInput from './redux_form_compatible_input';

const Name = () => (
  <Field
    name="name"
    label="Name"
    component={ReduxFormCompatibleInput}
    validate={value => (value ? undefined : 'Name is required!')}
  />
);

export default Name;
