import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';

import ModelForm from './../model_form';
import Currency from './../form_elements/currency';
import Name from './../form_elements/name';

const Account = ({ handleFormSubmit, editForm }) => (
  <ModelForm name="Account" icon="currency" handleFormSubmit={handleFormSubmit}>
    <Field name="name" label="Name" component={Form.Input} />
    <Form.Group widths="equal">
      <Name disabled = {editForm}/>
      <Currency
        disabled = {editForm}
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
  createAccount: PropTypes.func,
  editForm: PropTypes.bool,
  handleFormSubmit: PropTypes.any
};

export default Account;
