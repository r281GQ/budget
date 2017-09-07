import { fromJS } from 'immutable';
import * as _ from 'lodash';

import initialState from './../initial_state';
import * as grouping from './../actions/grouping';

const reducer = (state = initialState.get('grouping'), { type, payload }) => {
  switch (type) {
    case grouping.WRITE_GROUPINGS:
      return state.set('data', fromJS(_.keyBy(payload, '_id')));
    case grouping.WRITE_GROUPING:
      return state.update('data', value =>
        value.set(payload._id, fromJS(payload))
      );
    default:
      return state;
  }
};

export default reducer;
