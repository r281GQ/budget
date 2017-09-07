import request from './../../../../services/request';
import * as accounts from './../actions/account';

// export const logOut = () => dispatch =>
//   request
//     .get('/api/auth/logout')
//     .then(() => {
//       dispatch({ type: auth.LOG_OUT });
//     })
//     .catch(error => console.log(error));

export const createAccount = account => dispatch => {
  request
    .post('/api/account', account)
    .then(({ data }) => {
      dispatch({ type: accounts.WRITE_ACCOUNT, payload: data });
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
