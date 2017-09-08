import React from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';

const ReduxFormCompatibleDropDown = ({ disabled, input, options, label }) => (
  <Form.Field disabled={disabled}>
    <label>{label}</label>
    <Dropdown
      selection
      {...input}
      value={input.value}
      onChange={(param, { value }) => input.onChange(value)}
      placeholder={label}
      options={options}
    />
  </Form.Field>
);

ReduxFormCompatibleDropDown.propTypes = {
  label: PropTypes.any,
  options: PropTypes.any,
  disabled: PropTypes.any
};

export default ReduxFormCompatibleDropDown;
