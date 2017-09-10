import React from 'react';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleInput from './redux_form_compatible_input';

/*eslint no-useless-escape: "off"*/
const Email = () => (
  <Field
    name="email"
    label="Email"
    component={ReduxFormCompatibleInput}
    validate={email =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
        ? undefined
        : 'Email is not a valid format!'}
  />
);

export default Email;
