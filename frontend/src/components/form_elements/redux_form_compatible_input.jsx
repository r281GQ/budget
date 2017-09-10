import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

const ReduxFormCompatibleInput = props => (
  <Form.Field>
    <Form.Input
      {...props}
      error={props.meta.error && props.meta.touched ? true : false}
    />
    {props.meta.error && props.meta.touched ? (
      <Message negative>
        <Message.Header>{props.meta.error}</Message.Header>
      </Message>
    ) : null}
  </Form.Field>
);

ReduxFormCompatibleInput.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.any,
    touched: PropTypes.bool
  })
};

export default ReduxFormCompatibleInput;
