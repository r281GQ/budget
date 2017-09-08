import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';
import ReduxFormCompatibleDropDown from './../redux_form_compatible_drop_down';

const Budget = ({budgets}) => (
  <Field
    name="budget"
    label="Budget"
    component={ReduxFormCompatibleDropDown}
    options={budgets}
  />
);

Budget.propTypes = {
  budgets: PropTypes.any
};

export default Budget;
