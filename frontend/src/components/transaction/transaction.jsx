import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';

import Budget from './budget';
import Equity from './equity';
import Account from './account';
import Grouping from './grouping';
import Amount from './amount';
import ModelForm from './../model_form';
import { Name, Currency } from './../form_elements/index';

const Transaction = props => (
  <ModelForm
    name="Transaction"
    icon="usd"
    handleFormSubmit={null}
    invalid={props.invalid && props.dirty}
  >
    <Name />
    <Field name="memo" label="Memo" component={Form.Input} />
    <Form.Group widths="equal">
      <Amount />
      <Currency
        currencies={[
          {
            key: 1,
            text: 'GBP',
            value: 'GBP'
          }
        ]}
      />
    </Form.Group>
    <Account accounts={[{ key: 1, text: 'account', value: 'dssdf' }]} />
    <Grouping grouping={[{ key: 1, text: 'account', value: 'dssdf' }]} />
    <Budget budgets={[{ key: 1, text: 'budget', value: 'dssdf' }]} />
    <Equity equities={[{ key: 1, text: 'equity', value: 'dssdf' }]} />
  </ModelForm>
);

Transaction.propTypes = {
  dirty: PropTypes.bool
};

export default Transaction;
