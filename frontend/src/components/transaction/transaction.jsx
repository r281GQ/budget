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

const Transaction = props => {
  return (
    <ModelForm
      name="Transaction"
      icon="usd"
      handleFormSubmit={props.handleFormSubmit}
      error={props.error}
      invalid={props.invalid && props.anyTouched}
    >
      <Name />
      <Field name="memo" label="Memo" component={Form.Input} />
      <Form.Group widths="equal">
        <Amount />
        <Currency
          disabled={false}
          currencies={[
            {
              key: 'GBP',
              text: 'GBP',
              value: 'GBP'
            }
          ]}
        />
      </Form.Group>
      <Account
        accounts={props.accounts.map(account => ({
          key: account._id,
          text: account.name,
          value: account._id
        }))}
      />
      <Grouping
        grouping={props.groupings.map(grouping => ({
          key: grouping._id,
          text: grouping.name,
          value: grouping._id
        }))}
      />
      <Budget
        budgets={
          props.budgets ? (
            props.budgets
              .concat({ name: 'No budget!', _id: 0 })
              .map(budget => ({
                key: budget._id,
                text: budget.name,
                value: budget._id
              }))
          ) : (
            []
          )
        }
      />
      <Equity equities={[{ key: 1, text: 'equity', value: 'dssdf' }]} />
    </ModelForm>
  );
};

Transaction.propTypes = {
  anyTouched: PropTypes.bool,
  handleFormSubmit: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      initialBalance: PropTypes.number,
      currentBalance: PropTypes.number
    })
  ),
  budgets: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      defaultAllowance: PropTypes.number,
      currentAllowance: PropTypes.number
    })
  ),
  groupings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.oneOf(['income', 'expense'])
    })
  ),
  error: PropTypes.shape({
    _error: PropTypes.string
  })
};

export default Transaction;
