import { fromJS } from 'immutable';
import * as _ from 'lodash';

import initialState from './../initial_state';
import * as account from './../actions/account';

const reducer = (state = initialState.get('account'), { type, payload }) => {
  switch (type) {
    case account.WRITE_ACCOUNTS:
      return state.set('data', fromJS(_.keyBy(payload, '_id')));
    case account.DELETE_ACCOUNT:
      return state.deleteIn(['data', payload]);
    case account.WRITE_ACCOUNT:
      return state.update('data', value =>
        value.set(payload._id, fromJS(payload))
      );
    default:
      return state;
  }
};

export default reducer;
