import {
  stopSubmit
} from 'redux-form/immutable';

import request from './../../../../services/request';
import * as transactions from './../actions/transaction';
import * as budget from './../actions/budget';
import * as account from './../actions/account';
import * as messageActions from './message';

export const createTransaction = transaction => dispatch => {
  request
    .post('/api/transaction', transaction)
    .then(({
      data
    }) => {
      dispatch({
        type: transactions.WRITE_TRANSACTION,
        payload: data
      });
      if (data.budget)
        dispatch({
          type: budget.WRITE_BUDGET,
          payload: data.budget
        });
      dispatch({
        type: account.WRITE_ACCOUNT,
        payload: data.account
      });
      dispatch(
        messageActions.setSuccessMessage(
          'Transaction was created successfully!'
        )
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('transaction', {
        _error: error.response.data.error
      }))
    );
};

export const updateTransaction = transaction => dispatch => {
  request
    .put('/api/transaction', transaction)
    .then(({
      data
    }) => {
      dispatch({
        type: transactions.WRITE_TRANSACTION,
        payload: data
      });
      if (data.budget)
        dispatch({
          type: budget.WRITE_BUDGET,
          payload: data.budget
        });
      dispatch({
        type: account.WRITE_ACCOUNT,
        payload: data.account
      });
      dispatch(
        messageActions.setSuccessMessage(
          'Transaction was updated successfully!'
        )
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('transaction', {
        _error: error.response.data.error
      }))
    );
};

export const deleteTransaction = _id => dispatch => {
  request
    .delete(`/api/transaction/${_id}`)
    .then(({
      data
    }) => {
      dispatch({
        type: transactions.DELETE_TRANSACTION,
        payload: _id
      });
      if (data.budget)
        dispatch({
          type: budget.WRITE_BUDGET,
          payload: data.budget
        });
      dispatch({
        type: account.WRITE_ACCOUNT,
        payload: data.account
      });
      dispatch(
        messageActions.setSuccessMessage(
          'Transaction was deleted successfully!'
        )
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error => {
      dispatch(messageActions.setErrorMessage(error.response.data.error));
      dispatch(messageActions.openMessage());
    });
};

export const getTransactions = queries => dispatch => {
  request
    .get('/api/transaction', {
      params: queries
    })
    .then(({
        data
      }) =>
      dispatch({
        type: transactions.WRITE_TRANSACTIONS,
        payload: data
      })
      // dispatch(getDates())
    )
    .catch(() => undefined);
};

export const getDates = () => dispatch => {
  request
    .get('/api/transaction/dates')
    .then(({
      data
    }) => console.log(data))
    .catch(() => undefined);
};