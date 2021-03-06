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
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  disabled: PropTypes.bool
};

export default ReduxFormCompatibleDropDown;
