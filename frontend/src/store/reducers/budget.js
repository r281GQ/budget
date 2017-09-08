import { fromJS } from 'immutable';
import * as _ from 'lodash';

import initialState from './../initial_state';
import * as budget from './../actions/budget';

const reducer = (state = initialState.get('budget'), { type, payload }) => {
  switch (type) {
    case budget.WRITE_BUDGETS:
      return state.set('data', fromJS(_.keyBy(payload, '_id')));
    case budget.DELETE_BUDGET:
      return state.deleteIn(['data', payload]);
    case budget.WRITE_BUDGET:
      return state.update('data', value =>
        value.set(payload._id, fromJS(payload))
      );
    default:
      return state;
  }
};

export default reducer;
