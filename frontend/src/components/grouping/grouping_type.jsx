import React from 'react';
import PropTypes from 'prop-types';

import ReduxFormCompatibleDropDown from './../form_elements/redux_form_compatible_drop_down';
import { Field } from 'redux-form/immutable';

const GroupingType = ({ disabled }) => (
  <Field
    disabled={disabled}
    name="type"
    label="Type"
    component={ReduxFormCompatibleDropDown}
    options={[
      { key: 1, text: 'Income', value: 'income' },
      { key: 2, text: 'Expense', value: 'expense' }
    ]}
  />
);

GroupingType.propTypes = {
  disabled: PropTypes.bool
};

export default GroupingType;
