import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form/immutable';
import { routing, routerMiddlewareInstance } from './reducers/routing';
import thunk from 'redux-thunk';

import account from './reducers/account';
import auth from './reducers/auth';

const store = createStore(
  combineReducers({ account, auth, routing, form }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export default store;
