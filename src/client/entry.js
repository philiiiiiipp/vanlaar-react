/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';
import App from './App.jsx';

const store = createStore(window.__INITIAL_STATE__);

render(
  <App />,
  document.getElementById('app')
);


// render(
//   <Provider store={store}>
//     <App />,
//   </Provider>,
//   document.getElementById('app')
// );
