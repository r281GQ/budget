import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import { history } from './store/reducers/routing';
import store from './store/store';

import App from './containers/app';

/*eslint no-undef: "off"*/
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
