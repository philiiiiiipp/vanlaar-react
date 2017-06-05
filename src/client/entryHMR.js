/* @flow */

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './scenes/reducer';

const store = createStore(
  rootReducer, {},
  applyMiddleware(thunkMiddleware, createLogger())
);

const MAIN_ROUTE = './routes.js';
import App from './routes.js';

const rootEl = document.getElementById('app');
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    rootEl
  );
}

render(App);

if (module.hot) {
  module.hot.accept(MAIN_ROUTE, () => {
    const NextApp = require(MAIN_ROUTE).default;
    render(NextApp);
  });
}
