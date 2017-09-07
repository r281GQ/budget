import request from './../../../../services/request';
import * as accounts from './../actions/account';
import { whoAmI } from './who_am_i';

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
    .then(({data}) => {
      dispatch({type: accounts.WRITE_ACCOUNT, payload: data});
    })
    .catch(error => console.log(error));
};
export const signUp = userInfo => dispatch =>
  request
    .post('/api/auth/local/signup', userInfo)
    .then(() => dispatch(whoAmI()))
    .catch(error => console.log(error));
