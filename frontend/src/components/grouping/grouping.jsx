import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';

import Currency from './../form_elements/currency';
import ModelForm from './../model_form';

const Grouping = ({ handleSubmit, createGrouping }) => (
  <ModelForm
    name="Grouping"
    icon="id card"
    handleFormSubmit={handleSubmit(formProps => {
      createGrouping({
        name: formProps.get('name'),
        type: formProps.get('type')
      });
    })}
  >
    <Field name="name" label="Name" component={Form.Input} />

    <Currency
      currencies={[
        {
          key: 1,
          text: 'Income',
          value: 'income'
        },
        {
          key: 2,
          text: 'Expense',
          value: 'expense'
        }
      ]}
    />
  </ModelForm>
);

Grouping.propTypes = { createGrouping: PropTypes.func };

export default Grouping;
