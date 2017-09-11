import * as messages from './../actions/message';

export const setSuccessMessage = message => {
  return {
    type: messages.SET_SUCCESS_MESSAGE,
    payload: message
  };
};

export const setErrorMessage = message => {
  return {
    type: messages.SET_ERROR_MESSAGE,
    payload: message
  };
};

export const openMessage = () => {
  return {
    type: messages.OPEN_MESSAGE
  };
};

export const closeMessage = () => {
  return {
    type: messages.CLOSE_MESSAGE
  };
};
