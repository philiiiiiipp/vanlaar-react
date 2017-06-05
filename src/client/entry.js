/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Main from './routes.js';

// const ROOT_REDUCER_PATH = '../reducer';
import rootReducer from './scenes/reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);


render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
