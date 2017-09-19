import {
  stopSubmit
} from 'redux-form/immutable';

import * as groupings from './../actions/grouping';
import * as messageActions from './message';
import {
  getTransactions
} from './transaction';
import {
  getBudgets
} from './budget';
import request from './../../../../services/request';
import autoLogout from './../../../../services/auto_logout';

export const createGrouping = grouping => dispatch => {
  request
    .post('/api/grouping', grouping)
    .then(({
      data
    }) => {
      dispatch({
        type: groupings.WRITE_GROUPING,
        payload: data
      });
      dispatch(
        messageActions.setSuccessMessage('Grouping was created successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error => dispatch(autoLogout(error, stopSubmit('grouping', {
      _error: error.response.data.error
    }))));
};

export const getGroupings = () => dispatch => {
  request
    .get('/api/grouping')
    .then(({
      data
    }) => {
      dispatch({
        type: groupings.WRITE_GROUPINGS,
        payload: data
      });
    })
    .catch(() => undefined);
};

export const updateGrouping = account => dispatch => {
  request
    .put('/api/grouping', account)
    .then(({
      data
    }) => {
      dispatch({
        type: groupings.WRITE_GROUPING,
        payload: data
      });
      dispatch(
        messageActions.setSuccessMessage('Grouping was created successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('grouping', {
        _error: error.response.data.error
      }))
    );
};

export const deleteGrouping = _id => dispatch => {
  request
    .delete(`/api/grouping/${_id}`)
    .then(() => {
      dispatch({
        type: groupings.DELETE_GROUPING,
        payload: _id
      });
      dispatch(
        messageActions.setSuccessMessage('Grouping was deleted successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .then(() => dispatch(getTransactions()))
    .then(() => dispatch(getBudgets()))
    .catch(error => {
      dispatch(messageActions.setErrorMessage(error.response.data.error));
      dispatch(messageActions.openMessage());
    });
};