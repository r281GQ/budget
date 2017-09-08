import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import ReduxFormCompatibleDropDown from './../redux_form_compatible_drop_down';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form/immutable';

const Currency = () => <Field
  name="currency"
  label="Currency"
  component={ReduxFormCompatibleDropDown}
  options={[
    {
      key: 1,
      text: 'GBP',
      value: 'GBP'
    }
  ]}
/>

Currency.propTypes = {

};

export default Currency;
