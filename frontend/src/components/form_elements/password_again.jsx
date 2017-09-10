import React from 'react';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleInput from './redux_form_compatible_input';

const PasswordAgain = () => (
  <Field
    name="passwordAgain"
    label="Password Again"
    type="password"
    component={ReduxFormCompatibleInput}
    validate={(password, allValue) =>
      allValue.get('password') === allValue.get('passwordAgain')
        ? undefined
        : `Passwords don't match!`}
  />
);

export default PasswordAgain;
