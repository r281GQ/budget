import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';
import ReduxFormCompatibleDropDown from './../redux_form_compatible_drop_down';

let i = [
  {
    key: 1,
    text: 'dsdfsd',
    value: 'male'
  }
];

import { Name, Currency } from './../form_elements/index';
import Budget from './budget';
import Equity from './equity';
import ModelForm from './../model_form';

const Transaction = () => (
  <ModelForm name="Transaction" icon="usd" handleFormSubmit={null}>
    <Name />
    <Field name="memo" label="Memo" component={Form.Input} />
    <Form.Group widths="equal">
      <Field
        name="amount"
        label="Amount"
        type="number"
        component={Form.Input}
      />
      <Currency />
    </Form.Group>
    <Field
      name="grouping"
      label="Grouping"
      component={ReduxFormCompatibleDropDown}
      options={i}
    />
    <Budget budgets={[{ key: 1, text: 'budget', value: 'dssdf' }]} />
    <Equity equities={[{ key: 1, text: 'budget', value: 'dssdf' }]} />
    <Field
      name="equity"
      label="Equity"
      component={ReduxFormCompatibleDropDown}
      options={i}
    />
  </ModelForm>
);

Transaction.propTypes = {};

export default Transaction;
