/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './scenes/Main/Main.jsx';

export default (
  <Route>
    <Route path='/' component={Main}></Route>
  </Route>
);
