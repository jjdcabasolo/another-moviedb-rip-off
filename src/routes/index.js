import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '../components/notFound/NotFound';
import ComponentLoader from '../components/common/ComponentLoader';

import { routes } from './config';

const Movies = lazy(() => import('../containers/Movies'));
const TVShows = lazy(() => import('../containers/TVShows'));

const renderMovies = () => (
  <Suspense fallback={<ComponentLoader />}>
    <Movies />
  </Suspense>
);

const Routes = () => {
  return (
    <Switch>
      {/* { routes.map(e => (
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
      <Route component={NotFound} /> */}
      <Redirect exact from='/' to='/movies'/>
      <Route exact path="/movies">
        {renderMovies()}
      </Route>
      <Route exact path="/movies/:movieId">
        {renderMovies()}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
