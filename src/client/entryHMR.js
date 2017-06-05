/* @flow */

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

const MAIN_ROUTE = './routes.js';
import App from './routes.js';

const rootEl = document.getElementById('app');
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
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
