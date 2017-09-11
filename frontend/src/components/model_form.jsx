import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Button, Message } from 'semantic-ui-react';

import PaddedFormContainer from './padded_from_container';

const ModelForm = ({
  handleFormSubmit,
  children,
  name,
  icon,
  invalid,
  error,
  RenderMessage
}) => (
  <PaddedFormContainer>
    <Header block as="h2" icon={icon} content={name} />
    <Form onSubmit={handleFormSubmit}>
      {children}
      <Button type="submit" fluid disabled={invalid}>
        Submit
      </Button>
      {error ? (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      ) : null}
    </Form>
    <RenderMessage duration={3000} autoClose/>
  </PaddedFormContainer>
);

ModelForm.propTypes = {
  handleFormSubmit: PropTypes.any,
  children: PropTypes.any,
  name: PropTypes.any,
  icon: PropTypes.any,
  valid: PropTypes.bool,
  RenderMessage: PropTypes.any,
  error: PropTypes.any
};

export default ModelForm;
