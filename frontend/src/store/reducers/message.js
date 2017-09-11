import initialState from './../initial_state';
import * as message from './../actions/message';

const reducer = (state = initialState.get('message'), { type, payload }) => {
  switch (type) {
    case message.SET_ERROR_MESSAGE:
      return state.set('message', payload).set('messageType', 'error');
    case message.SET_SUCCESS_MESSAGE:
      return state.set('message', payload).set('messageType', 'success');
    case message.OPEN_MESSAGE:
      return state.set('isMessageOpen', true);
    case message.CLOSE_MESSAGE:
      return state.set('isMessageOpen', false);
    default:
      return state;
  }
};

export default reducer;
