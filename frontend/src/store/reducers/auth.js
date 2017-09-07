import initialState from './../initial_state';
import { fromJS } from 'immutable';
import * as auth from './../actions/auth';

export default (state = initialState.get('auth'), { type, payload }) => {
  switch (type) {
    case auth.LOGIN_SUCCESS:
      return state.set('user', fromJS(payload)).set('isAuthenticated', true);
    default:
      return state;
  }
};
