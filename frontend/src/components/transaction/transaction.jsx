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
        handleFormSubmit={props.handleFormSubmit}
    error = {props.error}
    invalid={props.invalid && props.anyTouched}
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
    <Account accounts={props.accounts.map(account => ({ key: account._id, text: account.name, value: account._id }))} />
    <Grouping grouping={props.groupings.map(grouping => ({ key: grouping._id, text: grouping.name, value: grouping._id }))} />
    <Budget budgets={[{ key: 1, text: 'budget', value: 0 }]} />
    <Equity equities={[{ key: 1, text: 'equity', value: 'dssdf' }]} />
  </ModelForm>
);

Transaction.propTypes = {
  anyTouched: PropTypes.bool,
  accounts: PropTypes.any,
  groupings: PropTypes.any,
  createTransaction: PropTypes.func,
  error: PropTypes.any,
  handleFormSubmit: PropTypes.any
};

export default Transaction;
