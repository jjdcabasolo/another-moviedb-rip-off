import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { routes } from './config';

const Routes = () => {
  return (
    <Switch>
      { routes.map(e => (
        <Route exact path={e.path}>
          {e.component}
        </Route>
      )) }
    </Switch>
  );
};

export default Routes;
