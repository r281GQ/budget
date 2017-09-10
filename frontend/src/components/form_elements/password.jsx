import React from 'react';

import { Field } from 'redux-form/immutable';
import ReduxFormCompatibleInput from './redux_form_compatible_input';

const Password = () => (
  <Field
    name="password"
    label="Password"
    type="password"
    component={ReduxFormCompatibleInput}
  />
);

export default Password;
