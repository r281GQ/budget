import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import ReduxFormCompatibleDropDown from './../form_elements/redux_form_compatible_drop_down';

const Equtiy = ({ equities }) => (
  <Field
    name="equity"
    label="Equtiy"
    component={ReduxFormCompatibleDropDown}
    options={equities}
  />
);

Equtiy.propTypes = {
  equities: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

export default Equtiy;
