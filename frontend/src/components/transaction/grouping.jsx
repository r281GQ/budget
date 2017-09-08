import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleDropDown from './../form_elements/redux_form_compatible_drop_down';

const Grouping = ({ grouping }) => (
  <Field
    name="grouping"
    label="Grouping"
    component={ReduxFormCompatibleDropDown}
    options={grouping}
  />
);

Grouping.propTypes = {
  grouping: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      value: PropTypes.string
    })
  )
};

export default Grouping;
