import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { Form, Dropdown } from 'semantic-ui-react';

const CustomDropDown = props => (
  <Form.Field>
    <Dropdown
      selection
      {...props.input}
      value={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      placeholder={props.label}
      options = {props.options}
    />
  </Form.Field>
);

CustomDropDown.propTypes = {
  label: PropTypes.any, options: PropTypes.any
};

export default CustomDropDown;
