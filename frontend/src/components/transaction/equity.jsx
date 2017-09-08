import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { Field } from 'redux-form/immutable';
import { Form } from 'semantic-ui-react';
import ReduxFormCompatibleDropDown from './../redux_form_compatible_drop_down';

const Equtiy = ({equities}) => (
  <Field
    name="equity"
    label="Equtiy"
    component={ReduxFormCompatibleDropDown}
    options={equities}
  />
);

Equtiy.propTypes = {
  equities: PropTypes.any
};

export default Equtiy;
