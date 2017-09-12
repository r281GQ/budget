import { stopSubmit } from 'redux-form/immutable';
import request from './../../../../services/request';
import * as groupings from './../actions/grouping';

import { getTransactions } from './transaction';
// import { getTransactions } from './transaction';
import { getBudgets } from './budget';

export const createGrouping = account => dispatch => {
  request
    .post('/api/grouping', account)
    .then(({ data }) => {
      dispatch({ type: groupings.WRITE_GROUPING, payload: data });
    })
    .catch(error => console.log(error));
};

export const getGroupings = () => dispatch => {
  request
    .get('/api/grouping')
    .then(({ data }) => {
      dispatch({ type: groupings.WRITE_GROUPINGS, payload: data });
    })
    .catch(error => console.log(error));
};
export const updateGrouping = account => dispatch => {
  request
    .put('/api/grouping', account)
    .then(({ data }) => {
      dispatch({ type: groupings.WRITE_GROUPING, payload: data });
    })
    .catch(error => console.log(error));
};

export const deleteGrouping = _id => dispatch => {
  request
    .delete(`/api/grouping/${_id}`)
    .then(({ data }) => {
      dispatch({ type: groupings.DELETE_GROUPING, payload: _id });
    })
    .then(() => dispatch(getTransactions()))
    .then(() => dispatch(getBudgets()))
    .catch(error => console.log(error));
};
