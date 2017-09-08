import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, Segment } from 'semantic-ui-react';

const Padded = styled.div`padding: 1em;`;

const PaddedFormContainer = ({ children }) => (
  <Padded>
    <Container text>
      <Segment>{children}</Segment>
    </Container>
  </Padded>
);

PaddedFormContainer.propTypes = {
  children: PropTypes.any
};

export default PaddedFormContainer;
