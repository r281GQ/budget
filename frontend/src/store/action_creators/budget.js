import { stopSubmit } from 'redux-form/immutable';

import request from './../../../../services/request';
import * as budgets from './../actions/budget';
import * as messageActions from './message';
import { getTransactions } from './transaction';

export const createBudget = budget => dispatch => {
  request
    .post('/api/budget', budget)
    .then(({ data }) => {
      dispatch({ type: budgets.WRITE_BUDGET, payload: data });
      dispatch(
        messageActions.setSuccessMessage('Budget was created successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('budget', { _error: error.response.data.error }))
    );
};

export const updateBudget = budget => dispatch => {
  request
    .put('/api/budget', budget)
    .then(({ data }) => {
      dispatch({ type: budgets.WRITE_BUDGET, payload: data });
      dispatch(
        messageActions.setSuccessMessage('Budget was updated successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('budget', { _error: error.response.data.error }))
    );
};

export const deleteBudget = _id => dispatch => {
  request
    .delete(`/api/budget/${_id}`)
    .then(() => {
      dispatch({ type: budgets.DELETE_BUDGET, payload: _id });
      dispatch(
        messageActions.setSuccessMessage('Budget was deleted successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .then(() => getTransactions())
    .catch(error => {
      dispatch(messageActions.setErrorMessage(error.response.data.error));
      dispatch(messageActions.openMessage());
    });
};

export const getBudgets = () => dispatch => {
  request
    .get('/api/budget')
    .then(({ data }) => {
      dispatch({ type: budgets.WRITE_BUDGETS, payload: data });
    })
    .catch(() => undefined);
};
