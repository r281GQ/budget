import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Button } from 'semantic-ui-react';

import PaddedFormContainer from './padded_from_container';

const ModelForm = ({ handleFormSubmit, children, name, icon, invalid }) => (
  <PaddedFormContainer>
    <Header block as="h2" icon={icon} content={name} />
    <Form onSubmit={handleFormSubmit}>
      {children}
      <Button type="submit" fluid disabled={invalid}>
        Submit
      </Button>
    </Form>
  </PaddedFormContainer>
);

ModelForm.propTypes = {
  handleFormSubmit: PropTypes.any,
  children: PropTypes.any,
  name: PropTypes.any,
  icon: PropTypes.any,
  valid: PropTypes.bool
};

export default ModelForm;
