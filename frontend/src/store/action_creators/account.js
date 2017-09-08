import request from './../../../../services/request';
import * as accounts from './../actions/account';

export const createAccount = account => dispatch => {
  request
    .post('/api/account', account)
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNT, payload: data });
    })
    .catch(error => console.log(error));
};

export const updateAccount = account => dispatch => {
  request
    .put('/api/account', account)
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNT, payload: data });
    })
    .catch(error => console.log(error));
};

export const deleteAccount = _id => dispatch => {
  request
    .delete(`/api/account/${_id}`)
    .then(({ data }) => {
      dispatch({ type: accounts.DELETE_ACCOUNT, payload: _id });
    })
    .catch(error => console.log(error));
};

export const getAccounts = () => dispatch => {
  request
    .get('/api/account')
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNTS, payload: data });
    })
    .catch(error => console.log(error));
};
