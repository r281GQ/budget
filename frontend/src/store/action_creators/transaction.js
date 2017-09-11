import request from './../../../../services/request';
import * as transaction from './../actions/transaction';
import * as budget from './../actions/budget';
import * as account from './../actions/account';

import { stopSubmit } from 'redux-form/immutable';

export const createTransaction = account => dispatch => {
  request
    .post('/api/transaction', account)
    .then(({ data }) => {
      dispatch({ type: transaction.WRITE_TRANSACTION, payload: data });
      console.log(data);
      if(data.budget)
      dispatch({ type: budget.WRITE_BUDGET, payload: data.budget });
      dispatch({ type: account.WRITE_ACCOUNT, payload: data.account });

      // return request.get(`/api/budget/${data.budget._id}`);
    })
    // .then(({ data }) => {
    // })
    .catch(error =>
      dispatch(stopSubmit('transaction', { _error: error.response.data.error }))
    );
};

export const updateTransaction = account => dispatch => {
  request
    .put('/api/transaction', account)
    .then(({ data }) => {
      dispatch({ type: transaction.WRITE_TRANSACTION, payload: data });
      if(data.budget)
      dispatch({ type: budget.WRITE_BUDGET, payload: data.budget });
        dispatch({ type: account.WRITE_ACCOUNT, payload: data.account });
    })
    .catch(error =>
      dispatch(stopSubmit('transaction', { _error: error.response.data.error }))
    );
};

export const deleteTransaction = _id => dispatch => {
  request
    .delete(`/api/transaction/${_id}`)
    .then(({data}) => {
      dispatch({ type: transaction.DELETE_TRANSACTION, payload: _id });
      if(data.budget)
      dispatch({ type: budget.WRITE_BUDGET, payload: data.budget });
        dispatch({ type: account.WRITE_ACCOUNT, payload: data.account });
    })
    .catch(error => dispatch(stopSubmit('transaction', { _error: error.response.data.error })));
};

export const getTransactions = () => dispatch => {
  request
    .get('/api/transaction')
    .then(({ data }) => {
      dispatch({ type: transaction.WRITE_TRANSACTIONS, payload: data });
    })
    .catch(error => console.log(error));
};
