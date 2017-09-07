import request from './../../../../services/request';
import * as auth from './../actions/auth';
import { whoAmI } from './who_am_i';

export const logOut = () => dispatch =>
  request
    .get('/api/auth/logout')
    .then(() => {
      dispatch({ type: auth.LOG_OUT });
    })
    .catch(error => console.log(error));

export const logIn = userInfo => dispatch => {
  request
    .post('/api/auth/local/login', userInfo)
    .then(() => {
      dispatch(whoAmI());
    })
    .catch(error => console.log(error));
};
export const signUp = userInfo => dispatch =>
  request
    .post('/api/auth/local/signup', userInfo)
    .then(() => dispatch(whoAmI()))
    .catch(error => console.log(error));
