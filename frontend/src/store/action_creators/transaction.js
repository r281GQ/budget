import request from './../../../../services/request';
import * as transaction from './../actions/transaction';

export const createTransaction = account => dispatch => {
  request
    .post('/api/transaction', account)
    .then(({ data }) => {
      dispatch({ type: transaction.WRITE_TRANSACTION, payload: data });
    })
    .catch(error => console.log(error));
};

export const updateTransaction = account => dispatch => {
  request
    .put('/api/transaction', account)
    .then(({ data }) => {
      dispatch({ type: transaction.WRITE_TRANSACTION, payload: data });
    })
    .catch(error => console.log(error));
};

export const deleteTransaction = _id => dispatch => {
  request
    .delete(`/api/transaction/${_id}`)
    .then(({ data }) => {
      dispatch({ type: transaction.DELETE_TRANSACTION, payload: _id });
    })
    .catch(error => console.log(error));
};

export const getTransactions = () => dispatch => {
  request
    .get('/api/transaction')
    .then(({ data }) => {
      dispatch({ type: transaction.WRITE_TRANSACTIONS, payload: data });
    })
    .catch(error => console.log(error));
};
