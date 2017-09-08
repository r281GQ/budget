import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';

import ModelForm from './../model_form';
import ReduxFormCompatibleDropDown from './../redux_form_compatible_drop_down';

const Account = ({ handleFormSubmit, editForm }) => (
  <ModelForm name="Account" icon="currency" handleFormSubmit={handleFormSubmit}>
    <Field name="name" label="Name" component={Form.Input} />
    <Form.Group widths="equal">
      <Field
        disabled={editForm}
        name="initialBalance"
        label="Initial balance"
        type="number"
        component={Form.Input}
      />
      <Field
        disabled={editForm}
        name="currency"
        label="Currency"
        component={ReduxFormCompatibleDropDown}
        options={[
          {
            key: 1,
            text: 'GBP',
            value: 'GBP'
          }
        ]}
      />
    </Form.Group>
  </ModelForm>
);

Account.propTypes = {
  createAccount: PropTypes.func,
  editForm: PropTypes.bool,
  handleFormSubmit: PropTypes.any
};

export default Account;
