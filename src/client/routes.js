/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Router, browserHistory } from 'react-router';

import Main from './scenes/Main.jsx';

export default () => {
  return <Router routes={
    <Route path='/' component={Main}></Route>
  } history={browserHistory} />;
};


// <IndexRoute component={LandingPage} />
