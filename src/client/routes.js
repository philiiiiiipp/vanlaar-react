/* @flow */

import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Main from './scenes/Main.jsx';
import PageWrapper from './scenes/PageWrapper.jsx';
import RobotDetail from './scenes/RobotDetail.jsx';

export default () => {
  return (
    <Router routes={
        <Route path='/' component={PageWrapper}>
          <IndexRoute component={Main} />
          <Route path='/:id' component={RobotDetail}></Route>
        </Route>
    } history={browserHistory} />
  );
}
