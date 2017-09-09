import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import ModelForm from './../model_form';
import Currency from './../form_elements/currency';
import Name from './../form_elements/name';
import InitialBalance from './initial_balance';

const Account = ({ handleFormSubmit, editForm, invalid, dirty }) => (
  <ModelForm
    name="Account"
    icon="currency"
    handleFormSubmit={handleFormSubmit}
    invalid={invalid && dirty}
  >
    <Name />
    <Form.Group widths="equal">
      <InitialBalance disabled={editForm} />
      <Currency
        disabled={editForm}
        currencies={[
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
  createAccount: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  editForm: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired
};

export default Account;
