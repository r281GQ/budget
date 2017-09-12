import { stopSubmit } from 'redux-form/immutable';

import request from './../../../../services/request';
import * as accounts from './../actions/account';
import * as messageActions from './message';

import { getTransactions } from './transaction';
import { getBudgets } from './budget';

export const createAccount = account => dispatch => {
  request
    .post('/api/account', account)
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNT, payload: data });
      dispatch(
        messageActions.setSuccessMessage('Account was created successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('account', { _error: error.response.data.error }))
    );
};

export const updateAccount = account => dispatch => {
  request
    .put('/api/account', account)
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNT, payload: data });
      dispatch(
        messageActions.setSuccessMessage('Account was updated successfully!')
      );
      dispatch(messageActions.openMessage());
    })
    .catch(error =>
      dispatch(stopSubmit('account', { _error: error.response.data.error }))
    );
};

export const deleteAccount = _id => dispatch => {
  request
    .delete(`/api/account/${_id}`)
    .then(() => {
      dispatch({ type: accounts.DELETE_ACCOUNT, payload: _id });
      dispatch(
        messageActions.setSuccessMessage('Account was deleted successfully!')
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

export const getAccounts = () => dispatch => {
  request
    .get('/api/account')
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNTS, payload: data });
    })
    .catch(() => undefined);
};
