import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const Styled = styled.div`
  display: flex;
  height: 90vh;
  justify-content: space-around;
  align-items: center;
`;

const Warning = ({ header, text }) => (
  <Styled>
    <Message warning style={{ flexGrow: 1 }}>
      <Message.Header>{header}</Message.Header>
       <p>{text}</p>
    </Message>
  </Styled>
);

Warning.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string
};

export default Warning;
