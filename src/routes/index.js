import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../components/notFound/NotFound';
import ComponentLoader from '../components/common/ComponentLoader';

import { routes } from './config';

const Routes = () => {
  return (
    <Switch>
      { routes.map(e => (
        <>
          <Route exact path={e.path}>
            <Suspense fallback={<ComponentLoader />}>
              {e.component}
            </Suspense>
          </Route>
          { e.child && (
            <Route exact path={e.child.path}>
              {e.child.component}
            </Route>
          )}
        </>
      )) }
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
