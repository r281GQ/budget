import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

import { closeMessage } from './../store/action_creators/message';

const MessageContainer = ({
  message,
  isMessageOpen,
  closeMessage,
  messageType,
  autoClose,
  duration
}) =>
  isMessageOpen ? messageType === 'error' ? (
    <Message
      negative
      onDismiss={autoClose ? setTimeout(closeMessage, duration) : closeMessage}
    >
      <Message.Header>{message}</Message.Header>
    </Message>
  ) : (
    <Message
      positive
      onDismiss={autoClose ? setTimeout(closeMessage, duration) : closeMessage}
    >
      <Message.Header>{message}</Message.Header>
    </Message>
  ) : null;

MessageContainer.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string,
  isMessageOpen: PropTypes.bool,
  closeMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    message: state.getIn(['message', 'message']),
    messageType: state.getIn(['message', 'messageType']),
    isMessageOpen: state.getIn(['message', 'isMessageOpen'])
  };
};

export default connect(mapStateToProps, { closeMessage })(MessageContainer);
