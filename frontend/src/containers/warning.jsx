import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const Warning = () => (
  <Message warning style={{ flexGrow: 1 }}>
    <Message.Header>
      You must create an account and a grouping before you can create a
      transaction!
    </Message.Header>
    <p>Go the the account or grouping page to do that</p>
  </Message>
);

Warning.propTypes = {};

export default Warning;
