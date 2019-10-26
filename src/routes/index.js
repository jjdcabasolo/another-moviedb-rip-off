import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../components/notFound/NotFound';

import { routes } from './config';

const Routes = () => {
  return (
    <Switch>
      { routes.map(e => (
        <Route exact path={e.path}>
          {e.component}
        </Route>
      )) }
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
