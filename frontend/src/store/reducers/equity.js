import { fromJS } from 'immutable';
import * as _ from 'lodash';

import initialState from './../initial_state';
import * as equity from './../actions/equity';

const reducer = (state = initialState.get('equity'), { type, payload }) => {
  switch (type) {
    case equity.WRITE_EQUITIES:
      return state.set('data', fromJS(_.keyBy(payload, '_id')));
    case equity.DELETE_EQUITY:
      return state.deleteIn(['data', payload]);
    case equity.WRITE_EQUITY:
      return state.update('data', value =>
        value.set(payload._id, fromJS(payload))
      );
    default:
      return state;
  }
};

export default reducer;
