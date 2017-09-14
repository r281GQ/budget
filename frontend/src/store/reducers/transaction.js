import { fromJS } from 'immutable';
import * as _ from 'lodash';

import initialState from './../initial_state';
import * as transactions from './../actions/transaction';

const reducer = (
  state = initialState.get('transaction'),
  { type, payload }
) => {
  switch (type) {
    case transactions.WRITE_TRANSACTIONS:
      return state.set('data', fromJS(_.keyBy(payload, '_id')));
    case transactions.DELETE_TRANSACTION:
      return state.deleteIn(['data', payload]);
    case transactions.WRITE_TRANSACTION:
      return state.update('data', value =>
        value.set(payload._id, fromJS(payload))
      );
    default:
      return state;
  }
};

export default reducer;
