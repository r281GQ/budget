import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleDropDown from './../form_elements/redux_form_compatible_drop_down';

const Budget = ({ budgets }) => (
  <Field
    name="budget"
    label="Budget"
    component={ReduxFormCompatibleDropDown}
    options={budgets}
  />
);

Budget.propTypes = {
  budgets: PropTypes.arrayOf(
    PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      value: PropTypes.string
    })
  )
};

export default Budget;
